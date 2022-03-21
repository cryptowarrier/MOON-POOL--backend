import { CreateItemDto } from "@/dtos/items.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Item } from "@/interfaces/items.interface";
import itemModel from "@/models/items.model";
import { isEmpty } from "class-validator";

class ItemService {
  public items = itemModel;
  public async findAllItems(payload: any): Promise<Item[]> {
    const categories = payload.category;
    let categoryFilter = [];
    for (let i = 0 ; i < categories.length ; i ++) {
      categoryFilter.push(
        {
          'category': categories[i]
        }
      )
    }
    const pipeline = [
      {
        '$match': {
          '$or': categoryFilter
        }
      }
    ];
    const items: Item[] = await this.items.aggregate(pipeline);
    return items;
  }

  public async createItem(itemData: CreateItemDto): Promise<Item> {
    if(isEmpty(itemData)) throw new HttpException(400, "You are not item");

    const createItemData: Item = await this.items.create(itemData);

    return createItemData;
  }

  public async findItemsByUser(user: string): Promise<Item[]> {
    if(isEmpty(user)) throw new HttpException(400, "You're not user");

    const findItems: Item[] = await this.items.find({user: user});
    return findItems;
  }

  public async findItemsByCategory(category: string): Promise<Item[]> {
    if(isEmpty(category)) throw new HttpException(400, "You are not category");

    const findItems: Item[] = await this.items.find({category: category});
    return findItems;
  }
}

export default ItemService;
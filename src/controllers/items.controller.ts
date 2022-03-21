import { NextFunction, Request, Response } from 'express';
import { CreateItemDto } from '@/dtos/items.dto';
import { Item } from '@interfaces/items.interface';
import itemsService from '@services/items.service';



class ItemsController {

  public itemsService = new itemsService();
  
  public createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemData: CreateItemDto = req.body;
      const createdAt = new Date();
      const createItemData: Item = await this.itemsService.createItem({...itemData, createdAt: createdAt, updatedAt: createdAt});
      res.status(200).json({data: createItemData, message: 'created'});
    } catch (err) {
      next(err);
    }
  }

  public getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = String(req.query.category).split(',');
      const itemsData: Item[] = await this.itemsService.findAllItems({category: categories});

      res.status(200).json({data: itemsData, message: 'findAll'});
    } catch (err) {
      next(err);
    }
  }

  public findItemsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: string = req.params.user;
      const findItemsData: Item[] = await this.itemsService.findItemsByUser(user);

      res.status(200).json({data: findItemsData, message: 'find'});
    } catch (err) {
      next(err);
    }
  }

  public findItemsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category: string = req.params.category;
      const findItemsData: Item[] = await this.itemsService.findItemsByCategory(category);

      res.status(200).json({data: findItemsData, message: 'find'});
    } catch (err) {
      next(err);
    }
  }
}

export default ItemsController;
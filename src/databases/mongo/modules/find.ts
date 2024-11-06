import ItemModel, { IItem } from "../models/item.js";

class ItemService {
    private itemModel;
  
    constructor() {
      this.itemModel = ItemModel.getModel();
    }
  
    public async getAllItems() {
      try {
        const items = await this.itemModel.find();
        console.log("All items:", items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

  }
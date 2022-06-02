export interface IRepository<T> {
    /**
     * Get all items
     * @param item
     */
    find(item: T): Promise<T[]>;
  
    /**
     * find one item by id
     * @param id
     */
    findOne(id: string): Promise<T>;
  
    /**
     * create item
     * @param item
     */
    create(item: T): Promise<any>;
  
    /**
     * save partial item
     * @param partial item
     */
    createPartial(item: Partial<T>): Promise<any> ;
  
    /**
     * update item by id
     * @param id
     * @param item
     */
    update(id: string, item: Partial<T>): Promise<any>;
  
    /**
     * delete item by id
     * @param id
     */
    delete(id: string): Promise<any>;
  
    /**
     * find item by query
     * @param query
     */
    findOneByQuery(query:Record<string,any>, filterFields: Record<string, any>): Promise<T>;
    
    /**
     * find item by query
     * @param query
     */
    countByQuery(query:Record<string,any>): Promise<T>;
  }
  
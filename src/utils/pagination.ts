
// Pagination utility for handling various data structures like arrays, sets, maps, and objects.
interface PaginationOptions {
  page: number;
  limit: number;
}

type Structure<T> = T[] | Set<T> | Map<any, T> | { [key: string]: T }; // Define a type that can be an array, set, map, or object

// Universal search options to allow custom search logic
// This can be used to specify how to search through the items in the pagination
interface UniversalSearchOptions<T> {

  field?: string; // Optional field to search in, if applicable

  searchBy?: (item: T, query: string) => boolean; // Function to define how to search through items
}

// Pagination class to handle data slicing and searching
export class Pagination<T extends Record<string, any>> {
  private originalData: T[];   // Always holds full normalized data
  private processedData: T[];  // Current paginated or searched result

  public currentPage: number;
  public perPage: number;
  public totalItems: number;
  public totalPages: number;

  constructor(data: Structure<T>) {
    this.originalData = this.normalize(data); // Normalize input data to an array
    this.processedData = [];
    this.currentPage = 1;
    this.perPage = 10;
    this.totalItems = 0;
    this.totalPages = 0;
  }

  private normalize(data: Structure<T>): T[] {
    if (Array.isArray(data)) {
      return data;
    } else if (data instanceof Set) {
      return Array.from(data);
    } else if (data instanceof Map) {
      return Array.from(data.values());
    } else if (typeof data === "object" && data !== null) {
      return Object.values(data);
    }
    throw new Error("Unsupported data structure");
  }

  // Method to get a nested value from an object using a dot-separated path
  // This is useful for accessing properties in nested objects
  private getNestedValue(obj: any, path: string): any {
    if (!path) return obj; // If path is empty, return the object itself
    const keys = path.split('.');
    return keys.reduce((acc, key) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return acc[key];
      }
      return undefined; // If the key does not exist, return undefined
    }, obj);
  }

  // Method to perform a deep search in the data
  // This checks if the value contains the keyword, either directly or in nested structures
  private deepSearch(value: T, keyword: string): boolean {

    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      return String(value).toLowerCase().includes(keyword.toLowerCase());
    } else if (Array.isArray(value)) {
      return value.some(item => this.deepSearch(item, keyword));
    } else if (typeof value === "object" && value !== null) {
      return Object.values(value).some(item => this.deepSearch(item, keyword));
    }

    return false
  }

  public paginate(structureData: Structure<T>, options: PaginationOptions): this {

    const page = options?.page ?? 1;
    const limit = options?.limit ?? 10;

    this.originalData = this.normalize(structureData);
    const normalizedData = this.originalData; // Normalize the data to ensure it's always an array

    const startIndex = (page - 1) * limit; // Calculate the starting index for slicing the data
    const endIndex = Math.min(normalizedData.length, startIndex + limit); // Calculate the ending index for slicing the data
    const sliceData = normalizedData.slice(startIndex, endIndex); // Slice the data array to get the current page's items

    const currentPage = Math.max(1, page); // Ensure the current page is at least 1
    const perPage = Math.max(1, limit); // Ensure the items per page is at least 1
    const totalPages = Math.ceil(normalizedData.length / perPage); // Calculate the total number of pages based on the total items and items per page
    const totalItems = normalizedData.length

    this.processedData = sliceData,  // Slice the data array to get the current page's items
      this.currentPage = currentPage,
      this.perPage = perPage,
      this.totalItems = totalItems,
      this.totalPages = totalPages

    return this; // Return the instance of Pagination for method chaining
  }

  // Method to get the current page's items
  public search(keyword: string, options?: UniversalSearchOptions<T>): this {
    const searchBy = options?.searchBy; // Get the custom search function from options
    const field = options?.field; // Get the custom search function from options

    const baseData = this.originalData;

    this.processedData = baseData?.filter(item => {
      if (searchBy) {
        return searchBy(item, keyword);
      } else if (field) {
        const value = this.getNestedValue(item, field);
        return this.deepSearch(value, keyword)
      } else {
        return this.deepSearch(item, keyword)
      }
    })

    // Optionally update metadata if needed
    this.processedData;
    this.totalItems = this.processedData.length;
    this.totalPages = Math.ceil(this.totalItems / this.perPage);
    this.currentPage = 1;

    return this
  }

  // Method to sort the processed data based on a comparison function
  // This allows for custom sorting logic to be applied to the data
  public sort(compareFn: (a: T, b: T) => number): this {
    this.processedData = [...this.processedData].sort(compareFn);
    return this;
  }


  // Method to get the processed data after pagination or search
  public getData(): T[] {
    return this.processedData;
  }

  // Method to reset the pagination to the original data
  public reset(): this {
    this.processedData = [...this.originalData];
    this.totalItems = this.processedData.length;
    this.totalPages = Math.ceil(this.totalItems / this.perPage);
    this.currentPage = 1;
    return this;
  }

} 
export interface IStorage {
  get<T>(key: string, alterative?: T): T | undefined;
  /**
   * save `{key, value}` into storage. `value` is serialized.
   * @param key
   * @param value
   * @param overwrite if true, ovewrites existing value, otherwise throw error when key exists
   */
  set<T>(key: string, value: T, overwrite?: boolean): IStorage;
  has(key: string): boolean;
  remove(keys: string | string[]): void;
}

export class StorageWrapper implements IStorage {
  constructor(readonly target: Storage) {}
  get<T>(
    key: string,
    alternateValue?: T,
    parseJson: boolean = true
  ): T | undefined {
    const value = this.target.getItem(key);
    if (value) {
      return parseJson ? JSON.parse(value) : value;
    } else {
      return alternateValue;
    }
  }
  /**
   * set `storage[key] = value`
   * @param key
   * @param value
   * @param overwrite
   * @returns
   */
  set<T>(key: string, value: T, overwrite: boolean = true) {
    if (value === undefined || value === null) {
      throw new Error(
        `use remove("${key}") to remove item. Invalid value cannot set to storage(isNull: ${
          value === null
        }, isUndefined: ${value === undefined})`
      );
    }
    const existing = this.get(key);
    if (!overwrite && existing) {
      throw new Error(
        `cannot overwite existing value for key [${key}], or use set(key, value, true) to overwrite the item.`
      );
    }
    const serialized = JSON.stringify(value);
    this.target.setItem(key, serialized);
    return this;
  }
  has(key: string): boolean {
    return !!this.target.getItem(key);
  }
  remove(keys: string | string[]) {
    const ks = typeof keys === "string" ? [keys] : keys;
    ks.forEach((key) => this.target.removeItem(key));
  }
}

export class MemoryStorage implements Storage {
  [name: string]: unknown;
  private _length: number = 0;
  private cached: Record<string, unknown> = {};

  get length(): number {
    return this._length;
  }
  clear(): void {
    this.cached = {};
    this._length = 0;
  }

  getItem(key: string): string | null {
    return (this.cached[key] as string) || null;
  }

  key(index: number): string | null {
    const keys = Object.keys(this.cached);
    return keys[index] || null;
  }

  removeItem(key: string): void {
    delete this.cached[key];
    this._length--;
  }

  setItem(key: string, value: string): void {
    if (!this.cached[key]) {
      this._length++;
    }
    this.cached[key] = value;
  }
}

import {
  DEXTERITY_VEST,
  AGED_BRIE,
  ELIXIR,
  SULFURAS,
  BACKSTAGE_PASS,
  CONJURED_MANA,
  MAX_QUALITY
} from "./config";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const adjustQuality = (item: Item, amount: number) => {
      item.quality += amount;
      if (item.quality > MAX_QUALITY) item.quality = MAX_QUALITY;
      if (item.quality < 0) item.quality = 0;
      return item;
    };

    return this.items.map(item => {
      if (item.name === SULFURAS) {
        return item;
      }

      if (item.name === AGED_BRIE || item.name === BACKSTAGE_PASS) {
        if (item.quality < MAX_QUALITY) {
          adjustQuality(item, 1);
          if (item.name == BACKSTAGE_PASS) {
            if (item.sellIn < 11) {
              adjustQuality(item, 1);
            }
            if (item.sellIn < 6) {
              adjustQuality(item, 1);
            }
          }
        }
      } else {
        if (item.quality > 0) {
          item.quality = item.quality - 1;
        }
      }

      item.sellIn = item.sellIn - 1;

      if (item.sellIn < 0) {
        if (item.name === AGED_BRIE) {
          adjustQuality(item, 1);
        } else {
          if (item.name === BACKSTAGE_PASS) {
            item.quality = item.quality - item.quality;
          } else {
            adjustQuality(item, -1);
          }
        }
      }

      return item;
    });
  }
}

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

  endOfDayBatch() {
    const adjustQuality = (item: Item, amount: number) => {
      item.quality += amount;
      if (item.quality > MAX_QUALITY) item.quality = MAX_QUALITY;
      if (item.quality < 0) item.quality = 0;
      return item;
    };

    const reduceSellIn = (item: Item) => item.sellIn--;

    const isExpired = (item: Item) => item.sellIn < 0;

    return this.items.map(item => {
      switch (item.name) {
        case SULFURAS: {
          return item;
        }
        case BACKSTAGE_PASS:
          {
            reduceSellIn(item);

            if (isExpired(item)) {
              item.quality = 0;
            } else if (item.sellIn < 6) {
              adjustQuality(item, 3);
            } else if (item.sellIn < 11) {
              adjustQuality(item, 2);
            } else {
              adjustQuality(item, 1);
            }
          }
          break;
        case AGED_BRIE:
          {
            reduceSellIn(item);

            if (isExpired(item)) {
              adjustQuality(item, 2);
            } else {
              adjustQuality(item, 1);
            }
          }
          break;
        case CONJURED_MANA:
          {
            reduceSellIn(item);

            if (isExpired(item)) {
              adjustQuality(item, -4);
            } else {
              adjustQuality(item, -2);
            }
          }
          break;
        default: {
          reduceSellIn(item);

          if (isExpired(item)) {
            adjustQuality(item, -2);
          } else {
            adjustQuality(item, -1);
          }
        }
      }

      return item;
    });
  }
}

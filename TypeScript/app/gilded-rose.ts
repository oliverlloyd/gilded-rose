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
    return this.items.map(item => {
      if (item.name === AGED_BRIE || item.name === BACKSTAGE_PASS) {
        if (item.quality < MAX_QUALITY) {
          item.quality = item.quality + 1;
          if (item.name == BACKSTAGE_PASS) {
            if (item.sellIn < 11) {
              if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < MAX_QUALITY) {
                item.quality = item.quality + 1;
              }
            }
          }
        }
      } else {
        if (item.quality > 0) {
          if (item.name != SULFURAS) {
            item.quality = item.quality - 1;
          }
        }
      }

      if (item.name === SULFURAS) {
        // Nothing
      } else {
        item.sellIn = item.sellIn - 1;
      }

      if (item.sellIn < 0) {
        if (item.name === AGED_BRIE) {
          if (item.quality < MAX_QUALITY) {
            item.quality = item.quality + 1;
          }
        } else {
          if (item.name === BACKSTAGE_PASS) {
            item.quality = item.quality - item.quality;
          } else {
            if (item.quality > 0) {
              if (item.name != SULFURAS) {
                item.quality = item.quality - 1;
              }
            }
          }
        }
      }

      return item;
    });
  }
}

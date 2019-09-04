import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

// - Once the sell by date has passed, Quality degrades twice as fast
// - The Quality of an item is never negative
// - "Aged Brie" actually increases in Quality the older it gets
// - The Quality of an item is never more than 50
// - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
// - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
// - Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
// - Quality drops to 0 after the concert

// "Conjured" items degrade in Quality twice as fast as normal items

// -------- day 0 --------
// name, sellIn, quality
// +5 Dexterity Vest 10 20
// Aged Brie 2 0
// Elixir of the Mongoose 5 7
// Sulfuras, Hand of Ragnaros 0 80
// Sulfuras, Hand of Ragnaros -1 80
// Backstage passes to a TAFKAL80ETC concert 15 20
// Backstage passes to a TAFKAL80ETC concert 10 49
// Backstage passes to a TAFKAL80ETC concert 5 49
// Conjured Mana Cake 3 6

// -------- day 1 --------
// name, sellIn, quality
// +5 Dexterity Vest 9 19
// Aged Brie 1 1
// Elixir of the Mongoose 4 6
// Sulfuras, Hand of Ragnaros 0 80
// Sulfuras, Hand of Ragnaros -1 80
// Backstage passes to a TAFKAL80ETC concert 14 21
// Backstage passes to a TAFKAL80ETC concert 9 50
// Backstage passes to a TAFKAL80ETC concert 4 50
// Conjured Mana Cake 2 5

describe("Gilded Rose", function() {
  it("should reduce quality by one", () => {
    const gildedRose = new GildedRose([
      new Item("Elixir of the Mongoose", 5, 8)
    ]);
    const items = gildedRose.endOfDayBatch();
    expect(items[0].quality).to.equal(7);
  });

  it("should reduce the sellIn value by one", () => {
    const gildedRose = new GildedRose([
      new Item("Elixir of the Mongoose", 5, 8)
    ]);
    const items = gildedRose.endOfDayBatch();
    expect(items[0].sellIn).to.equal(4);
  });

  it("should not reduce quality below zero", () => {
    const gildedRose = new GildedRose([
      new Item("Elixir of the Mongoose", 5, 0)
    ]);
    const items = gildedRose.endOfDayBatch();
    expect(items[0].quality).to.equal(0);
  });

  it("should degrade quality twice as fast when an item is expired", () => {
    const gildedRose = new GildedRose([
      new Item("Elixir of the Mongoose", 0, 10)
    ]);
    const items = gildedRose.endOfDayBatch();
    expect(items[0].quality).to.equal(8);
  });

  it("should make an exception for Aged Brie and increase quality over time", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 10)]);
    const items = gildedRose.endOfDayBatch();
    expect(items[0].quality).to.equal(11);
  });

  it("should not allow quality to be greater than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 50)]);
    const items = gildedRose.endOfDayBatch();
    expect(items[0].quality).to.equal(50);
  });

  it("should never degrade the quality of Sulfuras", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 5, 5)
    ]);
    const items = gildedRose.endOfDayBatch();
    expect(items[0].quality).to.equal(5);
  });

  it("should pass through negative values for sellIn unchanged for Sulfuras", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", -2, 5)
    ]);
    const items = gildedRose.endOfDayBatch();
    expect(items[0].sellIn).to.equal(-2);
  });

  describe("when dealing with backstage passes", () => {
    it("should reduce quality by 2 when there are less than 11 days left", function() {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 7, 5)
      ]);
      const items = gildedRose.endOfDayBatch();
      expect(items[0].quality).to.equal(7);
    });

    it("should reduce quality by 3 when there are less than 6 days left", function() {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)
      ]);
      const items = gildedRose.endOfDayBatch();
      expect(items[0].quality).to.equal(8);
    });

    it("should reduce the quality of Backstage Passes to zero once the concert has happened", function() {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)
      ]);
      const items = gildedRose.endOfDayBatch();
      expect(items[0].quality).to.equal(0);
    });
  });

  it("should degrade the quality of Conjured items twice as fast", function() {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 4, 5)]);
    const items = gildedRose.endOfDayBatch();
    expect(items[0].quality).to.equal(3);
  });
});

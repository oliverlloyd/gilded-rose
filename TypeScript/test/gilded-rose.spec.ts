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
  it("should foo", function() {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("fixme");
  });

  it.todo("should reduce quality by one");
  it.todo("should reduce the sellIn value by one");
  it.todo("should not reduce quality below zero");
  it.todo("should degrade quality twice as fast when an item is expired");
  it.todo(
    "should make an exception for Aged Brie and increase quality over time"
  );
  it.todo("should not allow quality to be greater than 50");
  it.todo("should never degrade the quality of Sulfuras");
  it.todo(
    "should pass through negative values for sellIn unchanged for Sulfuras"
  );
  it.todo(
    "should reduce quality for Backstage Passes by 2 when there are less than 11 days left"
  );
  it.todo(
    "should reduce quality for Backstage Passes by 3 when there are less than 6 days left"
  );
  it.todo(
    "should reduce the quality of Backstage Passes to zero once the concert has happened"
  );
  it.todo("should degrade the quality of Conjured items twice as fast");
});

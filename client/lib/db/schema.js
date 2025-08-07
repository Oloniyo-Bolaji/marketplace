import {
  integer,
  uuid,
  pgTable,
  varchar,
  text,
  pgEnum,
  jsonb,
  date,
  timestamp,
  boolean,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: text("id").primaryKey().notNull(),
  firstName: varchar("firstname", { length: 255 }).notNull(),
  lastName: varchar("lastname", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  image: text("image"),
  address: text("address"),
  phoneNumber: text("phoneNumber"),
  location: text("location"),
  bankAccount: varchar("bank_account", { length: 255 }),
  artisan: text("artisan"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const postsTable = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  price: varchar("price").notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
  images: jsonb("images").notNull(),
  category: text("category"),
  status: boolean("status").default(false),
  isedited: boolean("isedited").default(false),
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").defaultNow(),
  sellerId: text("seller_id")
    .notNull()
    .references(() => usersTable.id),
});

export const auctionsTable = pgTable("auctions", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  price: varchar("price").notNull(),
  bidPrice: varchar("bidPrice"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("endTime").notNull(),
  description: varchar("description", { length: 1000 }).notNull(),
  images: jsonb("images").notNull(),
  status: boolean("status").default(false),
  updatedAt: timestamp("updated_at"),
  createdAt: timestamp("created_at").defaultNow(),
  sellerId: text("seller_id")
    .notNull()
    .references(() => usersTable.id),
});

export const auctionsPriceTable = pgTable("auctionsPrice", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  price: varchar("price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  auctionId: uuid("auction_id")
    .notNull()
    .references(() => auctionsTable.id),
  buyerId: text("buyer_id")
    .notNull()
    .references(() => usersTable.id),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
  auctions: many(auctionsTable),
}));

export const postRelations = relations(postsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [postsTable.sellerId],
    references: [usersTable.id],
  }),
}));

export const auctionRelations = relations(auctionsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [auctionsTable.sellerId],
    references: [usersTable.id],
  }),
  bids: many(auctionsPriceTable),
}));

export const auctionsPriceRelations = relations(
  auctionsPriceTable,
  ({ one }) => ({
    auction: one(auctionsTable, {
      fields: [auctionsPriceTable.auctionId],
      references: [auctionsTable.id],
    }),
    buyer: one(usersTable, {
      fields: [auctionsPriceTable.buyerId],
      references: [usersTable.id],
    }),
  })
);

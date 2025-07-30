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
  location: text("location"),
  accountNo: varchar("account_no", { length: 10 }),
  accountName: text("accoun_tname"),
  bankName: text("bank_name"),
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

export const userRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const postRelations = relations(postsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [postsTable.sellerId],
    references: [usersTable.id],
  }),
}));

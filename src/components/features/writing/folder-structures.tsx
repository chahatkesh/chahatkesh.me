"use client";

import { useState } from "react";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import { cn } from "~/lib/utils";

type TreeNode = {
  name: string;
  note?: string;
  children?: TreeNode[];
};

type Structure = {
  id: string;
  name: string;
  shortName: string;
  coined: string;
  pitch: string;
  bestFor: string;
  watchFor: string;
  tree: TreeNode[];
};

const STRUCTURES: Structure[] = [
  {
    id: "layered",
    name: "Layered Architecture",
    shortName: "Layered",
    coined: "The usual first layout. Group files by kind.",
    pitch:
      "A component sits with components, and a hook sits with hooks. A coupon still has no folder of its own. One feature change can touch five directories.",
    bestFor: "A prototype, or an app whose changes are technical.",
    watchFor:
      "utils/ fills with code no one owns. One feature touches many folders.",
    tree: [
      {
        name: "src",
        children: [
          {
            name: "components",
            note: "Every component, whichever feature it belongs to.",
            children: [
              { name: "Button.tsx" },
              {
                name: "CartDrawer.tsx",
                note: "The cart screen lives here. The cart logic lives three folders away.",
              },
              { name: "LoginForm.tsx" },
              { name: "ProductCard.tsx" },
            ],
          },
          {
            name: "hooks",
            children: [{ name: "useCart.ts" }, { name: "useAuth.ts" }],
          },
          {
            name: "services",
            children: [
              { name: "cart.ts" },
              { name: "auth.ts" },
              { name: "products.ts" },
            ],
          },
          {
            name: "utils",
            note: "formatPrice, a date helper, and code with no owner.",
            children: [{ name: "format.ts" }, { name: "cn.ts" }],
          },
          {
            name: "types",
            children: [{ name: "cart.ts" }, { name: "user.ts" }],
          },
        ],
      },
    ],
  },
  {
    id: "screaming",
    name: "Screaming Architecture",
    shortName: "Screaming",
    coined:
      "Robert C. Martin, 2011. The top folders should say what the app does.",
    pitch:
      "Open the repo and you should see a store, not a React app. Next.js can keep app/. The other names should be the product.",
    bestFor: "A product whose nouns have shown up in more than one ticket.",
    watchFor:
      "A renamed folder can still be a pile. components/ and hooks/ still name the framework.",
    tree: [
      {
        name: "src",
        children: [
          {
            name: "catalog",
            note: "The storefront. This name is a product word.",
            children: [
              { name: "product.ts" },
              { name: "listing.ts" },
              { name: "search.ts" },
            ],
          },
          {
            name: "cart",
            children: [
              { name: "add-item.ts" },
              { name: "totals.ts" },
              { name: "cart-ui.tsx" },
            ],
          },
          {
            name: "checkout",
            children: [{ name: "place-order.ts" }, { name: "payment.ts" }],
          },
          {
            name: "identity",
            children: [{ name: "sign-in.ts" }, { name: "session.ts" }],
          },
          {
            name: "shared",
            note: "Only what two or more domains share.",
            children: [{ name: "money.ts" }, { name: "http.ts" }],
          },
        ],
      },
    ],
  },
  {
    id: "vertical-slice",
    name: "Vertical Slice Architecture",
    shortName: "Vertical Slice",
    coined: "Jimmy Bogard. Group by the behavior, not by the kind of file.",
    pitch:
      "add-to-cart keeps its screen, its check, its request, and its test. You change that behavior in one folder, not in services/ and then components/.",
    bestFor: "Products where the work arrives as features.",
    watchFor:
      "Copied helpers, and slices that import each other's private files.",
    tree: [
      {
        name: "src",
        children: [
          {
            name: "features",
            children: [
              {
                name: "add-to-cart",
                note: "One request, one folder. Everything this behavior needs.",
                children: [
                  { name: "ui.tsx" },
                  { name: "model.ts" },
                  { name: "api.ts" },
                  { name: "add-to-cart.test.ts" },
                ],
              },
              {
                name: "checkout",
                children: [
                  { name: "ui.tsx" },
                  { name: "model.ts" },
                  { name: "api.ts" },
                ],
              },
              {
                name: "sign-in",
                children: [
                  { name: "ui.tsx" },
                  { name: "model.ts" },
                  { name: "api.ts" },
                ],
              },
            ],
          },
          {
            name: "shared",
            children: [{ name: "ui" }, { name: "lib" }],
          },
        ],
      },
    ],
  },
  {
    id: "fsd",
    name: "Feature-Sliced Design",
    shortName: "FSD",
    coined:
      "Layers, then slices, then a public file. You don't have to create every layer.",
    pitch:
      "Imports flow downward, and each slice is reached through index.ts. Start with app, pages, and shared. Add the middle layers when a second page reuses the code.",
    bestFor: "A frontend with many people and areas that live for years.",
    watchFor:
      "Filling widgets, features, and entities before a second page needs them.",
    tree: [
      {
        name: "src",
        children: [
          {
            name: "app",
            note: "Providers, routing, and the global store. The shell around the product.",
            children: [{ name: "providers.tsx" }, { name: "styles.css" }],
          },
          {
            name: "pages",
            note: "Start here. Keep a screen's code on the page until a second page needs it.",
            children: [
              { name: "catalog" },
              { name: "cart" },
              { name: "checkout" },
            ],
          },
          {
            name: "widgets",
            note: "Page sections built from features and entities, such as a header or a cart drawer.",
            children: [{ name: "header" }, { name: "cart-drawer" }],
          },
          {
            name: "features",
            children: [
              {
                name: "add-to-cart",
                children: [
                  { name: "ui" },
                  { name: "model" },
                  { name: "api" },
                  {
                    name: "index.ts",
                    note: "The public file. Other code imports this, and stops at this file.",
                  },
                ],
              },
              { name: "sign-in" },
            ],
          },
          {
            name: "entities",
            note: "Business nouns with behavior: product, user, cart.",
            children: [{ name: "product" }, { name: "user" }, { name: "cart" }],
          },
          {
            name: "shared",
            children: [{ name: "ui" }, { name: "lib" }, { name: "api" }],
          },
        ],
      },
    ],
  },
];

function nodeKey(parent: string, name: string) {
  return `${parent}/${name}`;
}

function Tree({
  nodes,
  parent = "",
  selected,
  onSelect,
}: {
  nodes: TreeNode[];
  parent?: string;
  selected: string | null;
  onSelect: (key: string, node: TreeNode) => void;
}) {
  return (
    <ul className="m-0 list-none space-y-0.5 p-0" role="tree">
      {nodes.map((node) => (
        <TreeItem
          key={nodeKey(parent, node.name)}
          node={node}
          parent={parent}
          selected={selected}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

function TreeItem({
  node,
  parent,
  selected,
  onSelect,
}: {
  node: TreeNode;
  parent: string;
  selected: string | null;
  onSelect: (key: string, node: TreeNode) => void;
}) {
  const key = nodeKey(parent, node.name);
  const hasChildren = Boolean(node.children?.length);
  const [open, setOpen] = useState(parent === "");
  const isSelected = selected === key;
  const Icon = hasChildren ? (open ? FolderOpen : Folder) : File;

  return (
    <li
      className="m-0 p-0"
      role="treeitem"
      aria-expanded={hasChildren ? open : undefined}
    >
      <button
        type="button"
        onClick={() => {
          if (hasChildren) setOpen((value) => !value);
          onSelect(key, node);
        }}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left font-sans text-[13px] leading-none transition-colors",
          isSelected
            ? "bg-ring/15 text-foreground"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
        )}
      >
        {hasChildren ? (
          <ChevronRight
            aria-hidden
            className={cn(
              "size-3 shrink-0 transition-transform",
              open && "rotate-90",
            )}
          />
        ) : (
          <span className="size-3 shrink-0" />
        )}
        <Icon
          aria-hidden
          className={cn(
            "size-3.5 shrink-0",
            hasChildren ? "text-ring" : "text-muted-foreground/80",
          )}
        />
        <span className="truncate font-mono text-[12px]">{node.name}</span>
      </button>
      {hasChildren && open && (
        <div className="ml-3 border-l border-border/70 pl-2">
          <Tree
            nodes={node.children!}
            parent={key}
            selected={selected}
            onSelect={onSelect}
          />
        </div>
      )}
    </li>
  );
}

export function FolderStructures() {
  const [activeId, setActiveId] = useState(STRUCTURES[0]!.id);
  const active =
    STRUCTURES.find((item) => item.id === activeId) ?? STRUCTURES[0]!;
  const [selected, setSelected] = useState<{
    key: string;
    note: string;
    name: string;
  } | null>(null);

  function handleSelect(key: string, node: TreeNode) {
    setSelected({
      key,
      name: node.name,
      note: node.note ?? `${node.name} sits with the rest of this slice.`,
    });
  }

  return (
    <div className="writing-folder-explorer my-8 overflow-hidden rounded-xl border border-border bg-card/40 font-sans">
      <div
        className="flex gap-1 overflow-x-auto border-b border-border p-1.5"
        role="tablist"
        aria-label="Folder structures"
      >
        {STRUCTURES.map((structure) => {
          const isActive = structure.id === activeId;
          return (
            <button
              key={structure.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveId(structure.id);
                setSelected(null);
              }}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-ring/15 text-ring"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {structure.shortName}
            </button>
          );
        })}
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <Tree
            key={active.id}
            nodes={active.tree}
            selected={selected?.key ?? null}
            onSelect={handleSelect}
          />
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div>
            <h3 className="!mt-0 !mb-1 font-poem text-lg font-semibold text-foreground">
              {active.name}
            </h3>
            <p className="!mb-0 text-xs leading-relaxed text-muted-foreground">
              {active.coined}
            </p>
          </div>
          <p className="!mb-0 text-sm leading-relaxed text-muted-foreground">
            {active.pitch}
          </p>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-medium text-foreground">Best for</dt>
              <dd className="text-muted-foreground">{active.bestFor}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Watch for</dt>
              <dd className="text-muted-foreground">{active.watchFor}</dd>
            </div>
          </dl>
          {selected && (
            <p className="!mb-0 rounded-md border border-border bg-background/60 px-3 py-2 text-sm leading-relaxed text-muted-foreground">
              <span className="font-mono text-xs text-ring">
                {selected.name}
              </span>
              <span className="mt-1 block">{selected.note}</span>
            </p>
          )}
          {!selected && (
            <p className="!mb-0 text-xs text-muted-foreground/70">
              Click a folder or file to see why it lives there.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

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
    coined: "The default most of us ship first — group by technical type.",
    pitch:
      "Controllers with controllers, hooks with hooks, components in one giant drawer. Easy to start. Painful the day you have to change a single feature and touch six folders.",
    bestFor: "Small apps, prototypes, the first few weeks.",
    watchFor: "utils/ becomes a junk drawer. Related code lives far apart.",
    tree: [
      {
        name: "src",
        children: [
          {
            name: "components",
            note: "Every UI piece, regardless of which feature it belongs to.",
            children: [
              { name: "Button.tsx" },
              {
                name: "CartDrawer.tsx",
                note: "Cart UI lives here. Cart logic lives three folders away.",
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
            note: "formatPrice, a leftover date helper, and that function nobody wants to own.",
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
      "Robert C. Martin, 2011 — the folders should scream what the app does.",
    pitch:
      'Open the repo. In five seconds you should know this is commerce, not "a React app." Frameworks are a delivery detail. The domain is the architecture.',
    bestFor:
      "Any product with a real domain — once you can name the use cases.",
    watchFor:
      "Easy to fake. Folders named pages/ and api/ still scream Next.js.",
    tree: [
      {
        name: "src",
        children: [
          {
            name: "catalog",
            note: "The business, not the framework. This folder is the storefront.",
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
            note: "Only what two or more domains actually share.",
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
    coined:
      "Jimmy Bogard — couple along the axis of change, not across layers.",
    pitch:
      "A feature is a slice: UI, validation, data, and types in one folder. When checkout changes, you open checkout/. You do not tour services/, then models/, then components/.",
    bestFor: "Medium to large apps. Teams that ship features, not layers.",
    watchFor: "Cross-slice sharing creeps back in if you are not strict.",
    tree: [
      {
        name: "src",
        children: [
          {
            name: "features",
            children: [
              {
                name: "add-to-cart",
                note: "One request, one folder. Everything this use case needs.",
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
    coined: "FSD — layers, then slices, then segments, with a public API.",
    pitch:
      "The strictest of the four. app → pages → widgets → features → entities → shared. Imports only flow downward. Each slice talks through index.ts. Chaos has fewer places to hide.",
    bestFor: "Large frontends, many contributors, long-lived products.",
    watchFor:
      "Too much structure too early. A weekend project does not need six layers.",
    tree: [
      {
        name: "src",
        children: [
          {
            name: "app",
            note: "Providers, routing, global store. The shell, not the product.",
            children: [{ name: "providers.tsx" }, { name: "styles.css" }],
          },
          {
            name: "pages",
            children: [
              { name: "catalog" },
              { name: "cart" },
              { name: "checkout" },
            ],
          },
          {
            name: "widgets",
            note: "Page sections composed from features and entities — Header, CartDrawer.",
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
                    note: "The public API. Outsiders import this, never the insides.",
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

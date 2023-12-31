
This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

Login Page for Admin Panel
![image](https://github.com/eclouz/eclo-adminpanel/assets/124333244/127b4ed2-d8b1-4f67-a7da-6b62fa00c264)

Language integrated Admin Panel - Dashboard page
![image](https://github.com/eclouz/eclo-adminpanel/assets/124333244/e6292eae-2e8f-4c37-91f4-aec54ef7c949)

Profile View - Settings
![image](https://github.com/eclouz/eclo-adminpanel/assets/124333244/54635839-0b12-46b6-b2a2-7017b4a9b630)

Products Page
![image](https://github.com/eclouz/eclo-adminpanel/assets/124333244/0f68be62-c329-4401-ae5d-e9d5b88f5d60)

Let's deep dive to the products page 
- When we click to the edit button in the product usercontrol we can see full informations about our products adn we can edit them.
![image](https://github.com/eclouz/eclo-adminpanel/assets/125248359/1fe3dcc0-4e4d-4fea-990b-40befd6b6713)

- Let's add product details for your product with simply click to the "Add details" button in the product update page
![image](https://github.com/eclouz/eclo-adminpanel/assets/125248359/a737e502-0de8-47fe-811d-3175d3382527)
You can see your product's details with simple clicking of "Product detail" accordian , under the Save and Add details button
![image](https://github.com/eclouz/eclo-adminpanel/assets/125248359/8ce33abd-c69c-408b-ac70-8e38a44d9d2c)
If you want to modify your product detail informations click to the "Edit" button on your Product details user control if you want to delete it in user control has "Delete" button too .
![image](https://github.com/eclouz/eclo-adminpanel/assets/125248359/a565c9e0-3f14-44f2-bb03-bbf5d497e477)

- Let's deep dive into product details too :)
Inside of edit Product details you can add additional inforamtions to the product details like  details fashion and details size.
For example one product has several colors and the same color has several sizes .
You can manage this problem in this page


I will add Soon :)
    

Subcategories page
![image](https://github.com/eclouz/eclo-adminpanel/assets/124333244/d7be97c5-7f83-4e57-a196-9d871027cbf9)

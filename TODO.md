
## 1일차
### 라이브러리 설치
**라우터**
```shell
$ yarn add react-router-dom 
```

**아이콘**
```shell
$ yarn add react-icons
```

**tailwindcss**
```shell
$ yarn add tailwindcss 
$ npx tailwindcss init
```

tailwind.config.js 설정
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

index.css
```text
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 라우터 설정
**react-router-dom** 설치
```text
<App>
    / 👉 <Home>
    /products 👉 <AllProducts>
    /products/new 👉 <NewProduct>
    /products/:id 👉 <ProductDetail>
    /carts 👉 <MyCart>
```

**기본 CSS 레이아웃 관련**
<br/>
body 태그 안에 root 태그가 존재 <br/>
① body 태그에서 flex 설정 <br/>
② root 에서 너비 설정 <br/>
```text
body {
  line-height: 1;
  width: 100vw;
  height: 100vh;
  @apply flex flex-col items-center;
}

#root {
  @apply w-full max-w-screen-2xl;
}
```


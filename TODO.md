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

### 로그인

firebase - 구글 로그인 기능 구현
<br/>

① signInWithPopup(auto, provider): 팝업창으로 로그인 <br/>
② onAuthStateChanged(auth, callback): 페이지 새로 고침시 state 상태 초기화 되는 문제 해결하기 위해 사용 (useEffect로 같이 호출)

**참고. signInWithRedirect(auto, provider)**

- 화면 전체 페이지 이동, 로그인시 리다이렉트함
- 리다이렉트시 getRedirectResult 실행
- 아래 테스트 코드의 경우 Login 컴포넌트에서 firebase 의존하는 형태라 좋지 않음 -> firebase.js 정의해서 import해서 사용하는게 나음

```javascript
// Import the functions you need from the SDKs you need
import {auth, provider} from '../api/firebase'
import {signInWithRedirect, getRedirectResult} from 'firebase/auth';
import {useEffect, useState} from "react";

export default function Login() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const result = await getRedirectResult(auth);
            if (result) {
                const user = result.user;

                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                console.log(result);
            } else {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setUser(storedUser);
                }
            }
        }

        fetchUser();
    }, []);

    const handleLogin = async () => signInWithRedirect(auth, provider);

    const handleLogout = () => {
        auth.signOut();
        localStorage.removeItem("user");
        setUser(null);
    }

    return (<>
        {!user ? (
            <button onClick={handleLogin}>Login</button>
        ) : (
            <button onClick={handleLogout}>Logout</button>
        )}
    </>);
}
```

---

## 2일차

### 권한별 접근 제어 구현

**Firebase doc.** <br/>
https://firebase.google.com/docs?hl=ko
<br/>
https://firebase.google.com/docs/database/web/read-and-write?hl=ko

**Tip.** flex 에서 shrink-0하면 화면 사이즈 줄어도 크기 유지(로그인 후 사용자 아이콘)

1. Navbar 컴포넌트에만 종속된 user 상태가 다른 컴포넌트에서도 필요

- AuthContext 생성해서 전역 처리

```javascript
import {createContext, useContext, useEffect, useState} from "react";
import {login, logout, onUserStateChange} from "../api/firebase";

export const AuthContext = createContext();

// 우산을 만든다
export function AuthContextProvider({children}) {
    const [user, setUser] = useState(null);

    // 페이지 새로고침시 user state 상태가 초기화됨
    // onAuthStateChanged(firebase api) 호출하면 로그인 정보가 남아 있으면 재사용 가능
    // 사용자가 다시 로그인할 필요가 없다
    // useEffect는 랜더링 완료시 실행되는 hook이다
    useEffect(() => {
        onUserStateChange(user => {
            setUser(user);
        });
    }, []);

    return (<AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>);
}

// 다른 컴포넌트에서는 아래 호출하면 value={{..}}에 있는 정보 가져와 활용가능
export function useAuthContext() {
    return useContext(AuthContext);
}
```

2. 접근 권한 제어를 하기 위해 ProtectedRoute 생성하여 route element 감싼다

```text
// index.js
const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <Home/>},
            {path: '/products', element: <AllProducts/>},
            {path: '/products/new', element: (
                <ProtectedRoute requireAdmin> // requireAdmin = true 
                    <NewProduct/>
                </ProtectedRoute>
            )},
            {path: '/products/:id', element: <ProductDetail/>},
            {path: '/carts', element: (
                <ProtectedRoute>  // requireAdmin = false
                    <MyCart/>
                </ProtectedRoute>
            )}
        ]
    }
]);
```

3. ProtectedRoute 에서 권한이 없거나, 로그인 안한 상태에서 접근하는 경우 리다이렉트 시킨다

- 비회원 : Product 접근 허용
- 관리자 : Product, Carts, NewProducts 접근 허용
- 회원: Product, Carts 접근 허용

```javascript
// ProtectedRoute.jsx
export default function ProtectedRoute({children, requireAdmin}) {
    const {user} = useAuthContext();

    if (!user || (requireAdmin && !user.isAdmin)) { // 로그인이 안되거나, 관리자 권한이 없는 경우 리다이렉트
        return <Navigate to="/" replace/>;
    }

    return children;
}
```

---

## 3일차

### 신규 상품 등록

**참고. cloudinary 이미지 업로드**
https://cloudinary.com/documentation/client_side_uploading#code_explorer_upload_multiple_files_using_a_form_unsigned
<br/>
https://cloudinary.com/documentation/upload_images#upload_response
<br/>
https://support.cloudinary.com/hc/en-us/community/posts/4411628379410-Uploaded-Image-s-URL-is-not-included-in-REST-Api-response
<br/>
https://medium.com/geekculture/how-to-upload-images-to-cloudinary-with-a-react-app-f0dcc357999c

파일 업로드

```javascript
const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
    formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    formData.append("timestamp", new Date().getTime());
    formData.append("file", image);

    fetch(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL, {
        method: "post",
        body: formData
    }).then((response) => {
        return response.text();
    }).then((data) => {
        console.log("====업로드 결과");
        console.log(data);
    })
}
```

이미지 미리보기

```javascript
function readImageURL(e, callback) {
    const target = e.target;
    if (target.files && target.files[0]) {
        const reader = new FileReader();

        reader.readAsDataURL(target.files[0]);
        reader.onload = (e) => {
            callback(e.target.result); // setImage
        }
    }
}
```

심플하게 window.URL API 사용하여 이미지 미리보기 구현가능하다

```javascript
{
    file && <img className="w-96 mx-auto mb-2" src={URL.createObjectURL(file)} alt="local image"/>
}
```

참고. https://kyounghwan01.github.io/blog/JS/JSbasic/Blob-url/#google_vignette

**라이브러리 추가 설치**

```shell
// 상품 등록시 고유키 추가하기 위한 용도
$ yarn add uuid

// react query 
$ yarn add @tanstack/react-query
$ yarn add -D @tanstack/eslint-plugin-query        
```

---


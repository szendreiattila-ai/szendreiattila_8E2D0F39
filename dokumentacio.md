# bemutató
egy online könyvesbolt weboldalát fogom elkészíteni

## általam alkalmazott programozási technológiák:
HTML, CSS, JS 
## 3. Az egyes részek és függvények funkciójának rövid leírása

### Főbb Részek (Szekciók)

| Szekció neve | Funkció rövid leírása |
| :--- | :--- |
| **Navigációs Sáv (`<nav>`)** | Lehetővé teszi a "smooth-scroll" technikával történő navigációt a weboldal főbb szekciói (pl. Rólunk, Szolgáltatások, Kapcsolat) között. |
| **Fő Szekció/Hero Banner** | A weboldal legfontosabb üzenetét tartalmazza, valamint egy kiemelt gombot, amely a [Cél, pl. Kapcsolat űrlaphoz] vezeti a látogatót. |
| **[Egyedi Szekció neve, pl. Projektek Szekció]** | Bemutatja a szerző legfontosabb munkáit rövid leírásokkal és linkekkel a működő demókhoz. |
| **Kapcsolat Szekció** | Egy űrlapot tartalmaz, amelyen keresztül a felhasználók üzenetet küldhetnek. |
| **Lábléc (`<footer>`)** | Szerzői jogi információkat, valamint másodlagos, jogi linkeket (pl. Adatkezelési nyilatkozat) és közösségi média ikonokat tartalmaz. |

### Főbb Függvények (JavaScript)

| Függvény neve | Funkció rövid leírása |
| :--- | :--- |
| `initSmoothScroll()` | Inicializálja a görgetési eseményeket, hogy a navigációs linkek kattintására sima átmenettel ugorjon a megfelelő szekcióhoz. |
| `handleFormSubmit(event)` | Kezeli a Kapcsolat űrlap elküldését. Megakadályozza az alapértelmezett küldési eseményt, elvégzi az űrlap adatok egyszerű validálását. |
| `toggleMobileMenu()` | Felelős a mobil nézetben lévő ún. "hamburger menü" megjelenítéséért és elrejtéséért (CSS osztályok hozzáadásával/eltávolításával). |
| `fetchWeatherData()` | *[Ha van ilyen]* Aszinkron lekérdezést indít egy külső API-hoz (pl. OpenWeatherMap) a valós idejű adatok lekéréséhez. |

 
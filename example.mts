//-------------------------------------- TIPOS DE INFERENCIA
//-------------------------------------- NUMBER
//como a y b infiere que son number sin decirle nada
const a = 1;
const b = 2;
const c = a + b;
// c también será number

//-------------------------------------- STRING
//aquí la inferencia entiende que la var queda como string
let cadenaDeTexto = "Hola mundo";

//además muestra los métodos disponibles de la clase String
cadenaDeTexto = cadenaDeTexto.toUpperCase();

//cadenaDeTexto = 2  ❌ lo detecta como incorrecto

//-------------------------------------- ANY
let obj: any = { x: 0 };
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

//con any nos saltamos las validaciones de tipado de ts

//-------------------------------------- FUNCIONES
//las funciones no tienen inferencia debemos tiparlas siempre, en este caso no sabe que retornará o recibirá, por defecto lo trata como any
function saludar(mensaje) {
  console.log(mensaje);
}

saludar("Hola mundo");
saludar(100);

function saludarConTipado(mensaje: string): void {
  console.log(mensaje);
}

saludarConTipado("Hola mundo");
//saludarConTipado(100); ❌ lo detecta como incorrecto por el tipado

//ejemplo
const saludarConObjeto = (persona: { a: string; b: string }): string => {
  const { a, b } = persona;
  return b;
};

//ejemplo
const sumar = (a: number, b: number): number => {
  return 2;
};

//ejemplo
const sayHiFromFunction = (callback: (name: string) => void) => {
  //cuando no devolvemos nada, o aunque lo devolvamos no nos importa
  callback("John");
};

const sayHi = (name: string) => {
  console.log(`Hola ${name}`);
};

sayHiFromFunction(sayHi);

//ejemplo
function throwError(message: string): never {
  //para funciones que nunca van a devolver nada
  throw new Error(message);
}

//-------------------------------------- FUNCIONES CON INFERENCIA
//funciones anónimas según el contexto
const avengers = ["Iron Man", "Thor", "Hawkeye"];

avengers.forEach((avenger) => {
  //sabe que avenger es string y puedo usar la función.toUpperCase()
  console.log(avenger.toUpperCase());
});

//-------------------------------------- OBJETOS
/* let hero: {
  name: "thor";
  age: 1500;
}; */

//hero.power = 1000; ❌ no funciona porque se está creando como un contrato al declarar el objeto

/* const createHero = (name: string, age: number) => {
  return {
    name,
    age,
  };
};

const thor = createHero("thor", 1500); */

//-------------------------------------- TYPE ALIAS
/* type Hero = {
  name: string;
  age: number;
};


let hero: Hero = {
  name: "thor",
  age: 1500,
};

const createHero = (hero: Hero): Hero => {
  const { name, age } = hero;
  return { name, age };
};

const thor = createHero({ name: "thor", age: 1500 }); */

//--------------------------------------  OPTIONAL PROPERTIES

//template union type
/* type HeroId = `${string}-${string}-${string}-${string}-${string}`;

type Hero = {
  readonly id?: HeroId; //optional property
  name: string;
  age: number;
  isActive?: boolean;
};

let hero: Hero = {
  name: "thor",
  age: 1500,
};

const createHero = (hero: Hero): Hero => {
  const { name, age } = hero;
  return { id: crypto.randomUUID(), name, age, isActive: true };
};

const thor = createHero({ name: "thor", age: 1500 }); */

//-------------------------------------- TEMPLATE UNION TYPES

type HexadecimalColor = `#${string}`;
const color: HexadecimalColor = "#000000";

//-------------------------------------- UNION TYPES
// que un type puede set varios tipos
/*
type HeroPowerScale = "local" | "planetary" | "galactic" | "supergalactic";


let test: string | number | 2;
test = 2;
test = "test"; 
*/

//-------------------------------------- INTERSECTION TYPES (creación de tipos que se unen No extienden)

/* type HeroId = `${string}-${string}-${string}-${string}-${string}`;
type HeroPowerScale = "local" | "planetary" | "galactic" | "supergalactic";

type HeroBasicInfo = {
  name: string;
  age: number;
};

type HeroProperties = {
  readonly id?: HeroId;
  isActive?: boolean;
  powerScale?: HeroPowerScale;
};

type Hero = HeroBasicInfo & HeroProperties;

let hero: Hero = {
  name: "thor",
  age: 1500,
};

const createHero = (hero: HeroBasicInfo): Hero => {
  const { name, age } = hero;
  return { id: crypto.randomUUID(), name, age, isActive: true };
};

const thor = createHero({ name: "thor", age: 1500 });
thor.powerScale = "planetary"; */

//-------------------------------------- TYPE INDEXING

/* type HeroProperties = {
  isActive?: boolean;
  address: {
    planet: string;
    city: string;
  };
};

const addressHero: HeroProperties["address"] = {
  planet: "earth",
  city: "Madrid",
}; */

//-------------------------------------- TYPE FROM VALUE
//   typeof nos permite crear tipos a partir de código que ya tengamos

const address = {
  planet: "earth",
  city: "Madrid",
};

type Address = typeof address;

const addressHero: Address = {
  planet: "earth",
  city: "Madrid",
};

//-------------------------------------- TYPE FROM FUNCTION RETURN

function createAddress() {
  return { planet: "earth", city: "Madrid" };
}

//returnType es un utility que nos permite obtener el tipo del retorno de una función a traves del typeof de esa función
type AddressFromFunction = ReturnType<typeof createAddress>;

//-------------------------------------- ARRAYS

const languages: string[] = []; // esta sintaxis queda más clara
const languagesOtraSintaxis: Array<string> = []; //que ésta

// cuando un array puede contener varias cosas
const arrayDeCosas: (string | number)[] = [];

arrayDeCosas.push(100);
arrayDeCosas.push("cosas");

//-------------------------------------- MATRIX

/* 
[
  ['X', 'O', ''], // string[]
  ['O', 'X', 'X'], // string[]
  ['X', '', 'X'], // string[]
]
*/

type CellValue = "X" | "O" | "";
type GameBoard = [
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue],
  [CellValue, CellValue, CellValue]
];

/* 
como queremos que tenga una longitud de 3 y una altura de 3, necesitamos crear un tipo indicando la longitud de la tupla
const gameBoard: CellValue[][] = [
  ["X", "O", ""],
  ["O", "X", "X"],
  ["X", "", "X"],
]; */

const gameBoard: GameBoard = [
  ["X", "O", ""],
  ["O", "X", "X"],
  ["X", "", "X"],
];

gameBoard[0][1] = "";

//-------------------------------------- TUPLES
// GameBoard también es una tupla
// una tupla es como un array, pero que tiene una longitud fija

type State = [string, (name: string) => void];
const [hero, setHero]: State = useState("thor");

type RGB = [number, number, number];
const rgb: RGB = [255, 255, 0]; // 0 - 255

// -------------------------------------- CLASE NÚMERO 2 DEL CURSO TYPESCRIPT ---------------------------------------------------------------------------

//-------------------------------------- ENUMS

//si usamos el enum sin el const, al transpilar el código a js, genera mucho más código
// solo usariamos el enum sin const, cuando nuestro enum vaya a consumirse desde fuera (estamos creando una librería que va a ser consumida o algo por el estilo)
//un enum por defecto asigna valores empezando por el 0

const enum ERROR_TYPES {
  NOT_FOUND, //0
  UNAUTHORIZED, //1
  BAD_REQUEST, //2
}

//si quisiéramos cambiarlo haríamos:
const enum ERROR_TYPES_WITH_VALUES {
  NOT_FOUND = "notFound",
  UNAUTHORIZED = "unauthorized",
  BAD_REQUEST = "badRequest",
}

function mostrarMensaje(tipoDeError: ERROR_TYPES) {
  if (tipoDeError === ERROR_TYPES.NOT_FOUND) {
    console.log("No encontrado");
  } else if (tipoDeError === ERROR_TYPES.BAD_REQUEST) {
    console.log("Bad request");
  } else if (tipoDeError === ERROR_TYPES.UNAUTHORIZED) {
    console.log("Unauthorized");
  }
}

//-------------------------------------- ASERCIONES DE TIPOS

// hay ocasiones en la que cuando asignamos un valor a una variable que no es del tipo esperado,
// necesitamos hacer una aserción para que el tipo sea el correcto
// esto ocurre porque ts no funciona en tiempo de ejecución, por tanto al recuperar el
// querySelector ya sea un canvas, un p, o cualquier otro elemento HTML esto va a devolvernos --> HTMLElement

const canvas: HTMLElement | null = document.querySelector("canvas");

// en este caso como queremos recuperar el canvas, es necesario hacer una aserción y podremos ser más específicos

const canvasEspecificando = document.querySelector(
  "canvas"
) as HTMLCanvasElement;

// lo malo de hacer esto, es que estamos haciendo que ts se fie de nuestro criterio y que nuestra decisión prevalezca por encima de la de typescript
// además estamos diciendo que siempre vamos a recibir un elemento canvas, pero en el ejemplo anterior podíamos ver que también podía ser null

// usando js, podríamos inferir el tipo que estamos buscando al declararlo dentro del if:
const nuevoCanvas = document.querySelector("span");

if (nuevoCanvas != null && nuevoCanvas instanceof HTMLCanvasElement) {
  // todo esto era js, pero el compilador de ts ha sabido hacer inferencia y asignar el tipo correcto
  const ctx = nuevoCanvas.getContext("2d");
}

// typeof se usaría para datos primitivos --> string, number, boolean, symbol, undefined, null
// instanceof se usaría para instancias de un objeto --> HTMLCanvasElement, HTMLImageElement, HTMLVideoElement, HTML, date

//-------------------------------------- FETCHING DE DATOS

const API_URL = "https://jsonplaceholder.typicode.com/todos";
const response = await fetch(API_URL); // para poder usar await sin la magia de webpack o vite, necesitamos decir que nuestro fichero es un modulo a través de la extensión .mts

if (!response.ok) {
  throw new Error("Request failed");
}

type UserAPIResponse = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

const data: UserAPIResponse[] = await response.json();

const users = data.map((user) => {
  console.log(user.completed);
});

//-------------------------------------- INTERFACES
// son prácticamente idénticas a los types, pero en el caso de querer extenderla no hacemos la intersección como enl los types
// otra diferencia es que se pueden declarar varias interfaces con el mismo nombre extendiendo automáticamente sus valores

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Zapatilla extends Producto {
  talla: number;
}

interface CarritoDeCompras {
  totalPrice: number;
  productos: Producto[];
}

interface CarritoOps {
  add: (product: Producto) => void;
  remove: (product: Producto) => void;
  clear: () => void;
}

//también se pueden definir los métodos así

/* 
interface CarritoOps {
  add(product: Producto): void;
  remove(product: Producto): void;
  clear(): void;
}
 */

//-------------------------------------- NARROWING

// se le llama a hacer un embudo, cuando trabajamos con varios tipos de datos
// y usamos alguna propiedad que existe en unos si y otros no (length)
// debemos ir haciendo como una criba del dato para asegurarnos que podremos usar esa propiedad o función (length)

function mostrarLongitud(objeto: number | string) {
  // return objeto.length; ❌ La propiedad 'length' no existe en el tipo 'number'

  if (typeof objeto === "string") {
    // hacemos la criba y ya podemos usar propiedades de un string
    return objeto.length;
  }
}

interface Mario {
  company: "nintendo"; // se pueden asignar valores por defecto
  nombre: string;
  saltar: () => void;
}

interface Sonic {
  company: "sega";
  nombre: string;
  correr: () => void;
}

type Personaje = Mario | Sonic;

// type guard
// no se recomienda usarlo, para evitar código verboso
function checkIsSonic(personaje: Personaje): personaje is Sonic {
  return (personaje as Sonic).correr !== undefined;
}

function jugar(personaje: Personaje) {
  // console.log(personaje.correr) ❌ 	La propiedad correr no existe en el tipo 'Mario'.
  // para poder diferenciar un personaje y otro, necesitamos usar los type guards

  if (checkIsSonic(personaje)) {
    personaje.correr();
  }
}

//-------------------------------------- NEVER

function fn(x: string | number) {
  if (typeof x === "number") {
    x.toFixed();
  } else if (typeof x === "string") {
    x.toLowerCase();
  } else {
    x; // esta x va a ser del tipo never, ya que nunca va a llegar a ese else por los tipos que le hemos indicado
  }
}

//-------------------------------------- instanceof
// necesitamos crear una clase

interface IAvenger {
  name: string;
  powerScore: number;
  wonBattles: number;
  age: number;
}

class Avenger implements IAvenger {
  // para tipar las propiedades de una clase
  // se tipan aquí arriba

  name: string;
  powerScore: number;
  wonBattles: number;
  age: number;

  /*  readonly name: string;
  private powerScore: number;
  private readonly wonBattles: number = 0;
  age: number; */
  // para asignar como privada una propiedad de una clase
  // podemos usar la etiqueta private de typescript la cual no va a generar
  // código al realizar el transpilado, o podemos usar el # delante de la propiedad (#powerScale)
  // en este caso la propiedad sería privativa incluso en runtime

  // public son todas las propiedades por defecto
  // protected es como el private pero puedes acceder a clases que heredan de esta clase

  constructor(name: string, powerScore: number) {
    this.name = name;
    this.powerScore = powerScore;
  }

  get fullName() {
    return `${this.name}, de poder ${this.powerScore}`;
  }

  set power(newPower: number) {
    if (newPower <= 100) {
      this.powerScore = newPower;
    } else {
      throw new Error("Power score cannot be more than 100");
    }
  }
}

const avenger = new Avenger("spidey", 80);

```mermaid
classDiagram
    class App {
        +productData ProductJSON
    }
    class ProductList {
        +productData ProductJSON
        +handleActiveChange()
        +handleCounterChange()
    }
    class CounterBoxComponent {
        -productId string
        -min number
        -max number
        -counterValue number
        -isActive boolean
        +onIncrement()
        +onDecrement()
    }
    class ProductJSON{
        -id string
        -title string
        -price number
        -color string
        -productDescription string
        -imageUrls string[]
        -min number
        -max number
        -counterValue number
    }

    App --> ProductList : contains
    ProductList --> CounterBoxComponent : renders
    ProductList --> ProductJSON: uses data
    CounterBoxComponent --> ProductJSON: uses data

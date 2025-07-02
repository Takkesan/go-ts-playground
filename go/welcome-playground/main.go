package main

import (
	"fmt"
	"math"
	"math/rand"
	"runtime"
	"sync"
	"time"
)

func main() {
	fmt.Println("Hello World.")
	fmt.Println("The time is", time.Now())

	// 乱数
	fmt.Println("Random number is", rand.Intn(10))

	// パッケージの参照
	fmt.Println("π is", math.Pi)

	// 関数
	fmt.Println("Add 1 to 5", add(1, 5))
	a, b := swap("hello", "world")
	fmt.Println("Swap 'hello' and 'world'", a, b)

	// 名前付き戻り値
	c, d := split(10)
	fmt.Println("Split 10 into two parts", c, d)

	// 変数
	var i int = 42
	var f float64 = 3.14
	var s string = "Hello, Go!"
	var bo bool = true
	fmt.Println("Integer:", i)
	fmt.Println("Float:", f)
	fmt.Println("String:", s)
	fmt.Println("Boolean:", bo)

	var newF = float64(i) // intをfloat64に変換
	fmt.Println("Converted Integer to Float:", newF)

	const pi float64 = 3.14   // 定数
	const e float64 = 2.71828 // 定数
	fmt.Println("Constant e:", e)
	fmt.Println("Constant π:", pi)

	// 繰り返し
	for j := 0; j < 5; j++ {
		if j%2 == 0 {
			fmt.Println("Even number:", j)
		} else {
			fmt.Println("Odd number:", j)
		}

		// Goではwhileループの代わりにforループを使用
		sum := 1
		for sum < 100 {
			sum += sum
		}
		fmt.Println("Sum until 100:", sum)

		// 条件分岐
		fmt.Println(sqrt(10))
		fmt.Println(sqrt(-1))

		// 条件分岐と変数のスコープ
		if v := pow(3, 2, 10); v < 10 {
			fmt.Println("3^2 is less than 10, value is", v)
		} else {
			fmt.Println("3^2 is not less than 10, value is", v)
		}

		// swiitch文
		switch os := runtime.GOOS; os {
		case "darwin":
			fmt.Println("OS is macOS")
		case "linux":
			fmt.Println("OS is Linux")
		case "windows":
			fmt.Println("OS is Windows")
		default:
			fmt.Printf("OS is %s\n", os)
		}

		// defer文 スタックで管理される
		defer fmt.Println("This will be printed last, even if it is called first: 2")
		defer fmt.Println("This will be printed second, after the last defer statement: 1")
		fmt.Println("This will be printed first")

		// ポインタ
		i, j := 42, 2701
		p := &i
		fmt.Println("Pointer to i:", p)
		*p = 21 // ポインタを通じてiの値を変更
		fmt.Println("New value of i:", i)

		p = &j // ポインタをjに変更
		fmt.Println("Pointer to j:", p)
		*p = *p / 37 // ポインタを通じてjの値を変更
		fmt.Println("New value of j:", j)

		// 構造体の使用
		v := Vertex{3, 4}
		fmt.Println("Vertex:", v)
		fmt.Println("Vertex X:", v.X)
		fmt.Println("Vertex Y:", v.Y)

		// スライス(可変長の配列 C#でいうとList)
		primes := []int{2, 3, 5, 7, 11, 13}

		// 最初の要素は含むが最後の要素は含まない
		var ss []int = primes[1:4]
		fmt.Println("Slice of primes from index 1 to 4:", ss)

		// スライスの長さと容量
		// スライスの最初の要素から数えて、元となる配列の要素数
		fmt.Println("Length of slice ss:", len(ss))
		fmt.Println("Capacity of slice ss:", cap(ss))

		ss = append(ss, 17) // スライスに要素を追加
		fmt.Println("Slice after appending 17:", ss)

		ss = append(ss, 19, 23) // 複数の要素を追加
		fmt.Println("Slice after appending 19 and 23:", ss)

		for i, v := range ss {
			fmt.Printf("Index: %d, Value: %d\n", i, v)
		}

		// Map
		m := make(map[string]Vertex)
		m["Bell Labs"] = Vertex{40.68433, -74.39967}
		m["Google"] = Vertex{37.42202, -122.08408}
		fmt.Println("Bell Labs locationns:", m["Bell Labs"])
		fmt.Println("Google location:", m["Google"])

		delete(m, "Google") // Googleのエントリを削除
		fmt.Println("After deleting Google, map is:", m)
		element, ok := m["Google"]
		if ok {
			fmt.Println("Google exists in the map:", element)
		} else {
			fmt.Println("Google does not exist in the map")
		}

		// 関数クロージャー
		fmt.Println("Closure example:")
		pos := adder()
		for i := 0; i < 10; i++ {
			fmt.Println("Positive adder:", pos(i))
		}
	}

	// 構造体のメソッド
	vv := Vertex{3, 4}
	fmt.Println("Vertex Abs:", vv.Abs())
	vv.Scale(10)
	fmt.Println("Scaled Vertex:", vv)

	// インターフェースの使用
	var ii I = T{"Hello, Interface!"}
	ii.M() // インターフェースのメソッドを呼び出す

	nomal := NomalVilleager{Name: "Alice", Age: 30}
	vip := VipVillager{Name: "Bob", Age: 40, Rank: "Gold"}

	introduce(nomal)
	introduce(vip)

	// ゴルーチン
	fmt.Println("Starting goroutine...")
	go say("Hello from goroutine!")
	fmt.Println("Main function is running...")

	// チャネル
	ss := []int{1, 2, 3, 4, 5}
	ch := make(chan int, 1)
	go sum(ss[:len(ss)/2], ch) // スライスの前半をゴルーチンで処理
	go sum(ss[len(ss)/2:], ch) // スライスの後半をゴルーチンで処理
	x, y := <-ch, <-ch         // チャネルから結果を受信
	fmt.Println("Sum of first half:", x)
	fmt.Println("Sum of second half:", y)
	fmt.Println("Total sum:", x+y)

	// チャネルを使ったフィボナッチ数列の生成
	// 関数側でclose(c)を呼び出してチャネルを閉じることで、for rangeが終了する
	chh := make(chan int, 10)
	go fibonacci(cap(chh), chh)
	for i := range chh {
		fmt.Println("Fibonacci number:", i)
	}

	chhh := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(<-chhh)
		}
		quit <- 0 // 終了信号を送る
	}()
	fibonacci2(chhh, quit)

	// 排他制御
	cc := SafeCounter{v: make(map[string]int)}
	for i := 0; i < 1000; i++ {
		go cc.Inc("somekey")
	}

	time.Sleep(time.Second)
	fmt.Println("Final value of 'somekey':", cc.Value("somekey"))
}

func add(x int, y int) int {
	return x + y
}

func swap(x, y string) (string, string) {
	return y, x
}

// 関数の戻り値に名前をつける
// 短い関数で使うべき
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}

func sqrt(x float64) string {
	if x < 0 {
		return "Cannot calculate square root of negative number"
	}
	z := x
	for i := 0; i < 10; i++ {
		z -= (z*z - x) / (2 * z)
	}
	return fmt.Sprintf("Square root of %f is approximately %f", x, z)
}

func pow(x, n, lim float64) float64 {
	if v := math.Pow(x, n); v < lim {
		return v
	} else {
		return lim
	}
}

// 構造体
type Vertex struct {
	X, Y float64
}

// 構造体のメソッド
// Goでは構造体のメソッドはレシーバーを使って定義する
// 関数名の前にレシーバーを指定する
func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}
func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

// 関数クロージャー
// 内部で状態を保持する関数
// 例えばこの例ではsumという変数を保持しといて追加してく
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

// インターフェース
type I interface {
	M()
}

type T struct {
	S string
}

func (t T) M() {
	fmt.Print(t.S)
}

type NomalVilleager struct {
	Name string
	Age  int
}
type VipVillager struct {
	Name string
	Age  int
	Rank string
}

type Villager interface {
	GetName() string
}

func (v NomalVilleager) GetName() string {
	return v.Name
}

func (v VipVillager) GetName() string {
	return v.Name
}

func introduce(vi Villager) {
	switch v := vi.(type) {
	case NomalVilleager:
		fmt.Println("Nomal Villager:", v.GetName())
	case VipVillager:
		fmt.Println("VIP Villager:", v.GetName())
	default:
	}
}

func say(s string) {
	for i := 0; i < 5; i++ {
		time.Sleep(10 * time.Microsecond)
		fmt.Println(s, i)
	}
}

func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // チャネルに結果を送信
}

func fibonacci(n int, c chan int) {
	x, y := 0, 1
	for i := 0; i < n; i++ {
		c <- x
		x, y = y, x+y
	}

	close(c) // チャネルを閉じる
}

func fibonacci2(c, quit chan int) {
	x, y := 0, 1
	for {
		// caseの判断ができるようになったところを動的に追加していく感じ
		// select と case を使うことでチャネルからの入力を待ち受けることができる
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("Quiting fibonacci2")
			return
		}
	}
}

// 排他制御
type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
	c.mu.Lock() // 排他制御のためにロックを取得

	c.v[key]++
	c.mu.Unlock() // 処理が終わったらロックを解放
}

func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()         // 排他制御のためにロックを取得
	defer c.mu.Unlock() // deferを使うこともあるよ

	return c.v[key]
}

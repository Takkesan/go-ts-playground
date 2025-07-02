package main

import (
	"fmt"
)

type Number interface {
	int64 | float64
}

func main() {
	ints := map[string]int64{
        "first":  34,
        "second": 12,
    }
    floats := map[string]float64{
        "first":  35.98,
        "second": 26.99,
    }

	fmt.Println("Sum of ints:", SumIntsOrFloats(ints))
	fmt.Println("Sum of floats:", SumIntsOrFloats(floats))
}

// comparableは==や!=で比較できる型
// Mapのキーはこれなので使用している
func SumIntsOrFloats[K comparable, V Number](m map[K]V) V {
	var s V
	for _, v := range m {
		s += v
	}
	return s
}
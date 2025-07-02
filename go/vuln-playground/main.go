package main

import (
	"fmt"
	"os"

	"golang.org/x/text/language"
)

func main() {
        for _, arg := range os.Args[1:] {
                tag, err := language.Parse(arg)
                if err != nil {
                        fmt.Printf("%s: error: %v\n", arg, err)
                } else if tag == language.Und {
                        fmt.Printf("%s: undefined\n", arg)
                } else {
                        fmt.Printf("%s: tag %s\n", arg, tag)
                }
        }
}

//govulncheck のチュートリアル
// README.md を参照してコマンドを確認してください。

//上記のコマンドを実行すると脆弱性を検出してくれる

// === Symbol Results ===
// Vulnerability #1: GO-2025-3750
//     Inconsistent handling of O_CREATE|O_EXCL on Unix and Windows in os in
//     syscall
//   More info: https://pkg.go.dev/vuln/GO-2025-3750
//   Standard library
//     Found in: os@go1.24.3
//     Fixed in: os@go1.24.4
//     Platforms: windows
//     Example traces found:
//       #1: main.go:5:2: vuln.init calls os.init, which calls os.NewFile

// Your code is affected by 1 vulnerability from the Go standard library.
// This scan also found 0 vulnerabilities in packages you import and 2
// vulnerabilities in modules you require, but your code doesn't appear to call
// these vulnerabilities.
// Use '-show verbose' for more details.
package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var db *sql.DB

type Album struct {
	ID     int64
	Title  string
	Artist string
	Price  float32
}

// ちょっと追加してみた
func (a Album) String() string {
	return fmt.Sprintf("ID: %d, Title: %s, Artist: %s, Price: %.2f", a.ID, a.Title, a.Artist, a.Price)
}

func main() {
	godotenv.Load()
	fmt.Println("Hello, World!")

	// sql の接続を設定
	cfg := mysql.NewConfig()
	// 本来は.env をリポジトリに含めないようにする
	cfg.User = os.Getenv("MYSQL_USER")
	cfg.Passwd = os.Getenv("MYSQL_PASS")
	cfg.Net = "tcp"
	cfg.Addr = os.Getenv("MYSQL_HOST")
	cfg.DBName = os.Getenv("MYSQL_DB")

	// データベースに接続
	var err error
	db, err = sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}
	fmt.Println("Connected!")

	// アルバム名を指定してアルバムを取得
	albums, err := albumsByArtist("John Coltrane")
	if err != nil {
		log.Fatalf("Error fetching albums: %v", err)
	}
	for _, album := range albums {
		fmt.Println(album)
	}

	// IDでアルバムを取得
	album, err := albumByID(4)
	if err != nil {
		log.Fatalf("Error fetching album by ID: %v", err)
	}
	fmt.Println("Album by ID:", album)

	// 新しいアルバムを追加
	newAlbum := Album{
		Title:  "A Love Supreme",
		Artist: "John Coltrane",
		Price:  15.99,
	}

	// 新しいアルバムを追加
	id, err := addAlbum(newAlbum)
	if err != nil {
		log.Fatalf("Error adding album: %v", err)
	}
	fmt.Println("Added album with ID:", id)
}

func albumsByArtist(name string) ([]Album, error) {
	var albums []Album

	rows, err := db.Query("SELECT * FROM album WHERE artist = ?", name)
	if err != nil {
		return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
	}
	defer rows.Close()
	// rows.Next() で次の行に移動し、どんどん値を取得する
	for rows.Next() {
		var alb Album
		// ポインタを使って行の値を構造体に格納する
		if err := rows.Scan(&alb.ID, &alb.Title, &alb.Artist, &alb.Price); err != nil {
			return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
		}
		albums = append(albums, alb)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("albumsByArtist %q: %v", name, err)
	}
	return albums, nil
}

func albumByID(id int64) (Album, error) {
	var alb Album

	row := db.QueryRow("SELECT * FROM album WHERE id = ?", id)
	if err := row.Scan(&alb.ID, &alb.Title, &alb.Artist, &alb.Price); err != nil {
		if err == sql.ErrNoRows {
			return alb, fmt.Errorf("album with ID %d not found", id)
		}
		return alb, fmt.Errorf("albumByID %d: %v", id, err)
	}
	return alb, nil
}

func addAlbum(alb Album) (int64, error) {
	result, err := db.Exec("INSERT INTO album (title, artist, price) VALUES (?, ?, ?)", alb.Title, alb.Artist, alb.Price)
	if err != nil {
		return 0, fmt.Errorf("addAlbum: %v", err)
	}
	// LastInsertId() は主キーを生成する
	id, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("addAlbum: %v", err)
	}
	return id, nil
}

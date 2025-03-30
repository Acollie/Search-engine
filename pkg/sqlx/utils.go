package sqlx

import "strings"

const (
	delimiter = "------"
)

func ArrayToString(arr []string) string {
	return strings.Join(arr, delimiter)
}

func StringToArray(str string) []string {
	return strings.Split(str, delimiter)
}

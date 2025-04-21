package slice

import "strings"

const (
	delimiter = "------"
)

func ArrayToString(arr []string) string {
	return strings.Join(arr, delimiter)
}

func StringToArray(str string) []string {
	if str == "" {
		return nil
	}
	return strings.Split(str, delimiter)
}

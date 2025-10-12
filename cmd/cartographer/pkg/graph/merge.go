package graph

func Merge(graphs []Graph) (Graph, error) {
	if graphs == nil || len(graphs) == 0 {
		return nil, ErrNoGraphs
	}
	combined := Graph{}

	for _, graph := range graphs {
		for siteUrl, site := range graph {
			val, ok := combined[siteUrl]
			if !ok {
				combined[siteUrl] = site
				continue
			}
			val.ProminenceValue += site.ProminenceValue
		}
	}

	return combined, nil
}

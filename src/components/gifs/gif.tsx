import React from 'react';
import { Config } from 'react-promise-tracker';
import { CircularProgress } from 'react-md/lib/Progress';
import { GIFObject } from 'src/models/giphy';
import { useGiphySearch } from 'src/models/giphy/hooks';
import { useAsync } from 'src/utils/hooks';

const trackerConfig: Config = { area: 'gif-search', delay: 500 };
type GifListProps = { keywords: string };
export const GifList: React.FunctionComponent<GifListProps> = ({ keywords }) => {
    const gifs = useGiphySearch(keywords).map(x => <Gif key={x.id} {...x} />);
    return useAsync(trackerConfig) || <div style={styles.list}>{gifs}</div>
}

const Gif: React.FunctionComponent<GIFObject> = gif => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const onLoaded = React.useCallback(() => setLoading(false), [])
    const onError = React.useCallback(() => {
        setLoading(false);
        setError(true)
    }, [])
    return (
        <div style={styles.contentWrapper}>
            {loading && <CircularProgress id={gif.id} style={styles.spinner} />}
            {error && <div style={styles.error}>Preview unavailable</div>}
            <video autoPlay loop src={gif.images.fixed_height.webp} onLoadedData={onLoaded} onError={onError} />
        </div>
    );
};

const styles: GifsStyles = {
    list: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 50 },
    contentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginRight: 10,
        border: "1px solid #455A54"
    },
    spinner: { position: 'absolute' },
    error: { position: 'absolute', color: '#90A4AE' },
}

type GifsStyles = {
    list: React.CSSProperties,
    contentWrapper: React.CSSProperties,
    spinner: React.CSSProperties,
    error: React.CSSProperties
}
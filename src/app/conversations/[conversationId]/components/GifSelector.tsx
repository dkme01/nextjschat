'use client';

import {Grid} from '@giphy/react-components'
import {GiphyFetch} from '@giphy/js-fetch-api'
import {ReactDOM} from "next/dist/server/future/route-modules/app-page/vendored/rsc/entrypoints";
import {IGif} from "@giphy/js-types";
import {FC, SyntheticEvent, useState} from "react";
import ResizeObserver from "react-resize-observer";

// use @giphy/js-fetch-api to fetch gifs, instantiate with your api key
const gf = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_KEY as string);

// configure your fetch: fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
const fetchGifs = (offset: number) => gf.trending({offset})

interface GifSelectorProps {
	onGifClick: (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => void;
}

// Render the React Component and pass it your fetchGifs as a prop
const GifSelector: FC<GifSelectorProps> = ({onGifClick}) => {
	const [width, setWidth] = useState(window.innerWidth);
	return (
		<>
			<Grid
				onGifClick={onGifClick}
				fetchGifs={fetchGifs}
				hideAttribution
				width={width}
				columns={3}
				gutter={6}
			/>
			<ResizeObserver
				onResize={({width}) => setWidth(width)}/>
		</>
	);
};

export default GifSelector;
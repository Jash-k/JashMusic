<div align="center" style="display:flex; align-items:center; justify-content:center; gap:20px;">
  <img src="assets/Logo.png" alt="Virome API" width="120">

  <h1 style="margin:0; font-size:60px; line-height:1;">
    Virome API
  </h1>
</div>

<p align="center">
  Music API for YouTube Music, Lyrics & Streaming
</p>

<p align="center">
  <a href="https://verome-api.deno.dev/">Live Demo</a>
</p>

---

## Features

- Search songs, albums, artists with fallback video IDs for playback
- Get synced lyrics (LRC format)
- Stream audio via Piped/Invidious proxies
- Generate radio mixes from any song
- Trending music and top artists by country
- Artist/track info from Last.fm
- Built-in music player with YouTube IFrame API
- Auto region detection from IP

## Quick Start

```bash
deno run --allow-net --allow-env --allow-read mod.ts
```

Server runs at `http://localhost:8000`

## API Endpoints

### Search

| Endpoint | Description |
|----------|-------------|
| `/api/search?q=&filter=` | Search YouTube Music (songs/albums/artists) |
| `/api/yt_search?q=&filter=` | Search YouTube (videos/channels/playlists) |
| `/api/search/suggestions?q=` | Autocomplete suggestions |

### Content

| Endpoint | Description |
|----------|-------------|
| `/api/songs/:videoId` | Song details with artist/album links |
| `/api/albums/:browseId` | Album with tracks and artist |
| `/api/artists/:browseId` | Artist with discography |
| `/api/playlists/:playlistId` | Playlist tracks |
| `/api/chain/:videoId` | Full chain: Song → Artist → Albums |

### Discovery

| Endpoint | Description |
|----------|-------------|
| `/api/related/:videoId` | Related songs |
| `/api/radio?videoId=` | Generate radio mix |
| `/api/similar?title=&artist=` | Similar tracks |
| `/api/charts?country=` | Music charts |
| `/api/trending?country=` | Trending music |
| `/api/moods` | Mood categories |
| `/api/top/artists?country=` | Top artists |
| `/api/top/tracks?country=` | Top tracks |

### Streaming & Lyrics

| Endpoint | Description |
|----------|-------------|
| `/api/stream?id=` | Audio stream URLs |
| `/api/proxy?url=` | Audio proxy (CORS bypass) |
| `/api/lyrics?title=&artist=` | Synced lyrics (LRC) |

### Info

| Endpoint | Description |
|----------|-------------|
| `/api/artist/info?artist=` | Artist bio (Last.fm) |
| `/api/track/info?title=&artist=` | Track info (Last.fm) |

## Examples

```bash
# Search songs
curl "https://verome-api.deno.dev/api/search?q=Blinding%20Lights&filter=songs"

# Get lyrics
curl "https://verome-api.deno.dev/api/lyrics?title=Blinding%20Lights&artist=The%20Weeknd"

# Stream URLs
curl "https://verome-api.deno.dev/api/stream?id=4NRXx6U8ABQ"

# Radio mix
curl "https://verome-api.deno.dev/api/radio?videoId=4NRXx6U8ABQ"
```

## Project Structure

```
mod.ts      - Server and routes
lib.ts      - API clients (YT Music, YouTube, Last.fm, LRCLib)
ui.ts       - Web UI
assets/     - Logo
```

## Deploy

```bash
deployctl deploy --project=verome-api --prod mod.ts
```

## License

MIT

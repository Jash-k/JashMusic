/**
 * Virome API - Enhanced Music Player UI with Tamil Directors Gallery
 */

export const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JaSH MusiC</title>
  <link rel="icon" href="/assets/logo.png">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    :root{
      --accent:#10b981;--accent-glow:rgba(16,185,129,.3);--accent-dim:rgba(16,185,129,.15);
      --bg:#050505;--surface:#0d0d0d;--surface2:#161616;--surface3:#1f1f1f;
      --border:#1a1a1a;--border-light:#2a2a2a;
      --text:#fff;--text-dim:#b0b0b0;--muted:#808080;--dim:#505050;
    }
    body{font-family:'Inter',system-ui,sans-serif;min-height:100vh;color:var(--text);background:var(--bg);overflow-x:hidden}
    .bg{position:fixed;inset:0;z-index:-1;background:radial-gradient(ellipse 80% 50% at 50% -20%,rgba(16,185,129,.06),transparent)}
    .grain{position:fixed;inset:0;z-index:-1;opacity:.03;background:url('data:image/svg+xml,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');pointer-events:none}
    
    /* Header */
    .header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(5,5,5,.8);backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
    .header-inner{max-width:1400px;margin:0 auto;padding:16px 32px;display:flex;align-items:center;gap:24px}
    .logo-sm{width:40px;height:40px;border-radius:8px;filter:drop-shadow(0 0 12px var(--accent-glow))}
    .brand{font-size:1.3rem;font-weight:700;letter-spacing:-.5px;background:linear-gradient(135deg,var(--accent),#14f195);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .search-bar{flex:1;max-width:600px;position:relative}
    .search-input{width:100%;background:var(--surface2);border:1px solid var(--border);padding:12px 48px 12px 20px;border-radius:12px;color:var(--text);font-size:.95rem;transition:all .3s}
    .search-input:focus{outline:none;border-color:var(--accent);background:var(--surface3);box-shadow:0 0 0 3px var(--accent-dim)}
    .search-input::placeholder{color:var(--dim)}
    .search-icon{position:absolute;right:16px;top:50%;transform:translateY(-50%);color:var(--muted);pointer-events:none}
    .filter-pills{display:flex;gap:8px;white-space:nowrap}
    .pill{padding:8px 16px;background:transparent;border:1px solid var(--border);color:var(--muted);font-size:.85rem;font-weight:500;cursor:pointer;border-radius:20px;transition:all .2s}
    .pill:hover{border-color:var(--border-light);color:var(--text-dim)}
    .pill.active{background:var(--accent);border-color:var(--accent);color:#000}

    /* Main Container */
    .main{padding-top:80px;padding-bottom:140px;max-width:1400px;margin:0 auto;padding-left:32px;padding-right:32px}
    
    /* Home - Tamil Directors Gallery */
    .home{display:flex;flex-direction:column;gap:48px}
    .hero-section{text-align:center;padding:60px 0 40px}
    .hero-title{font-size:3.5rem;font-weight:800;letter-spacing:-2px;margin-bottom:16px;background:linear-gradient(135deg,#fff,var(--text-dim));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
    .hero-subtitle{font-size:1.2rem;color:var(--muted);font-weight:400}
    
    .directors-section{margin-bottom:60px}
    .section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px}
    .section-title{font-size:1.8rem;font-weight:700;letter-spacing:-.5px}
    .section-subtitle{color:var(--muted);font-size:.9rem;margin-top:4px}
    
    .directors-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:24px}
    .director-card{position:relative;cursor:pointer;border-radius:16px;overflow:hidden;transition:all .3s;border:1px solid var(--border);background:var(--surface)}
    .director-card:hover{transform:translateY(-8px);border-color:var(--border-light);box-shadow:0 20px 40px rgba(0,0,0,.4)}
    .director-card:hover .director-overlay{opacity:1}
    .director-photo{width:100%;aspect-ratio:1;object-fit:cover;background:var(--surface2)}
    .director-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.9),transparent);display:flex;flex-direction:column;justify-content:flex-end;padding:20px;opacity:0;transition:opacity .3s}
    .director-name{font-size:1rem;font-weight:600;margin-bottom:4px}
    .director-role{font-size:.75rem;color:var(--accent);text-transform:uppercase;letter-spacing:.5px}

    /* Results */
    .results-container{display:none}
    .results-container.active{display:block}
    .results-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border)}
    .results-title{font-size:1.5rem;font-weight:700}
    .results-count{color:var(--muted);font-size:.9rem}
    .back-btn{padding:10px 20px;background:var(--surface2);border:1px solid var(--border);color:var(--text);font-size:.9rem;font-weight:500;cursor:pointer;border-radius:10px;transition:all .2s}
    .back-btn:hover{background:var(--surface3);border-color:var(--border-light)}
    
    .results-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px}
    .track-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;cursor:pointer;transition:all .2s;position:relative}
    .track-card:hover{background:var(--surface2);border-color:var(--border-light);transform:translateY(-2px)}
    .track-card.playing{border-color:var(--accent);background:var(--accent-dim)}
    .track-card.playing::before{content:'';position:absolute;top:12px;right:12px;width:8px;height:8px;background:var(--accent);border-radius:50%;animation:pulse 1.5s ease-in-out infinite}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.2)}}
    .track-thumb{width:100%;aspect-ratio:1;border-radius:8px;object-fit:cover;background:var(--surface2);margin-bottom:12px}
    .track-info{min-height:60px}
    .track-title{font-size:.95rem;font-weight:600;margin-bottom:6px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
    .track-artist{font-size:.85rem;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .track-meta{display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding-top:8px;border-top:1px solid var(--border)}
    .track-type{font-size:.7rem;color:var(--accent);text-transform:uppercase;letter-spacing:.5px}
    .track-duration{font-size:.75rem;color:var(--dim);font-family:monospace}

    /* Loading & Empty States */
    .loading{padding:80px 20px;text-align:center;color:var(--accent);font-size:1.1rem}
    .loading::after{content:'';display:inline-block;width:20px;height:20px;border:2px solid var(--accent);border-top-color:transparent;border-radius:50%;animation:spin 1s linear infinite;margin-left:12px}
    @keyframes spin{to{transform:rotate(360deg)}}
    .empty{padding:80px 20px;text-align:center;color:var(--muted)}

    /* Enhanced Player */
    .player{position:fixed;bottom:0;left:0;right:0;z-index:100;background:rgba(5,5,5,.98);backdrop-filter:blur(40px);border-top:1px solid var(--border);display:none;flex-direction:column}
    .player.visible{display:flex}
    
    /* Player Main Row */
    .player-main{display:flex;align-items:center;gap:20px;padding:16px 32px}
    .player-thumb{width:64px;height:64px;border-radius:10px;object-fit:cover;background:var(--surface2);box-shadow:0 4px 12px rgba(0,0,0,.3)}
    .player-info{flex:1;min-width:0;max-width:300px}
    .player-title{font-size:1rem;font-weight:600;margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .player-artist{font-size:.85rem;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    
    /* Controls */
    .player-controls{flex:1;display:flex;flex-direction:column;gap:12px;max-width:600px}
    .controls-buttons{display:flex;align-items:center;justify-content:center;gap:16px}
    .ctrl-btn{width:44px;height:44px;border-radius:50%;background:var(--surface2);border:1px solid var(--border);color:var(--text);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-size:16px}
    .ctrl-btn:hover{background:var(--surface3);transform:scale(1.05)}
    .ctrl-btn:active{transform:scale(.95)}
    .ctrl-btn.play{width:52px;height:52px;background:var(--accent);border:none;color:#000;font-size:20px}
    .ctrl-btn.play:hover{background:#0ea373;transform:scale(1.08)}
    .ctrl-btn.active{color:var(--accent);border-color:var(--accent)}
    
    /* Progress Bar */
    .progress-container{display:flex;align-items:center;gap:12px}
    .time{font-size:.8rem;color:var(--muted);min-width:45px;text-align:center;font-family:monospace}
    .progress-bar{flex:1;height:6px;background:var(--surface2);border-radius:3px;cursor:pointer;position:relative;overflow:hidden}
    .progress-bar:hover .progress-fill{height:8px}
    .progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),#14f195);border-radius:3px;width:0%;transition:width .1s linear,height .2s}
    .progress-dot{position:absolute;top:50%;right:0;width:12px;height:12px;background:var(--accent);border-radius:50%;transform:translate(50%,-50%);opacity:0;transition:opacity .2s;box-shadow:0 0 8px var(--accent-glow)}
    .progress-bar:hover .progress-dot{opacity:1}

    /* Right Controls */
    .player-right{display:flex;align-items:center;gap:16px}
    .volume-container{display:flex;align-items:center;gap:12px}
    .volume-icon{color:var(--muted);cursor:pointer;font-size:18px}
    .volume-slider{width:100px;height:4px;background:var(--surface2);border-radius:2px;cursor:pointer;position:relative}
    .volume-fill{height:100%;background:var(--accent);border-radius:2px;width:70%}
    .lyrics-btn,.queue-btn{padding:8px 16px;background:var(--surface2);border:1px solid var(--border);color:var(--text-dim);font-size:.85rem;font-weight:500;cursor:pointer;border-radius:8px;transition:all .2s}
    .lyrics-btn:hover,.queue-btn:hover{background:var(--surface3);color:var(--text)}
    .lyrics-btn.active,.queue-btn.active{background:var(--accent-dim);border-color:var(--accent);color:var(--accent)}

    /* Visualizer Canvas */
    .visualizer{position:absolute;bottom:0;left:0;right:0;height:100px;opacity:.4;pointer-events:none;z-index:-1}

    /* Lyrics Panel */
    .lyrics-panel{position:fixed;right:0;top:80px;bottom:140px;width:400px;background:rgba(5,5,5,.98);backdrop-filter:blur(40px);border-left:1px solid var(--border);transform:translateX(100%);transition:transform .3s;z-index:90;overflow-y:auto;padding:32px 24px}
    .lyrics-panel.visible{transform:translateX(0)}
    .lyrics-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
    .lyrics-title{font-size:1.2rem;font-weight:700}
    .lyrics-close{cursor:pointer;color:var(--muted);font-size:1.5rem;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:all .2s}
    .lyrics-close:hover{background:var(--surface2);color:var(--text)}
    .lyrics-content{line-height:2;font-size:.95rem}
    .lyrics-line{padding:8px 0;transition:all .3s;color:var(--muted)}
    .lyrics-line.active{color:var(--accent);font-weight:600;transform:scale(1.05)}

    /* Queue Panel */
    .queue-panel{position:fixed;right:0;top:80px;bottom:140px;width:400px;background:rgba(5,5,5,.98);backdrop-filter:blur(40px);border-left:1px solid var(--border);transform:translateX(100%);transition:transform .3s;z-index:90;overflow-y:auto}
    .queue-panel.visible{transform:translateX(0)}
    .queue-header{padding:24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
    .queue-title{font-size:1.2rem;font-weight:700}
    .queue-close{cursor:pointer;color:var(--muted);font-size:1.5rem;width:32px;height:32px;display:flex;align-items:center;justify-content:center;border-radius:8px;transition:all .2s}
    .queue-close:hover{background:var(--surface2);color:var(--text)}
    .queue-list{padding:16px}
    .queue-item{display:flex;align-items:center;gap:12px;padding:12px;border-radius:8px;cursor:pointer;transition:all .2s;margin-bottom:8px}
    .queue-item:hover{background:var(--surface2)}
    .queue-item.playing{background:var(--accent-dim)}
    .queue-thumb{width:48px;height:48px;border-radius:6px;object-fit:cover;background:var(--surface2)}
    .queue-info{flex:1;min-width:0}
    .queue-name{font-size:.9rem;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .queue-artist{font-size:.8rem;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .queue-number{color:var(--dim);font-size:.85rem;min-width:30px;text-align:center}

    /* Responsive */
    @media(max-width:1024px){
      .lyrics-panel,.queue-panel{width:100%;top:80px}
      .player-right{display:none}
    }
    @media(max-width:768px){
      .header-inner{padding:12px 16px}
      .filter-pills{display:none}
      .main{padding-left:16px;padding-right:16px}
      .hero-title{font-size:2.5rem}
      .directors-grid{grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:16px}
      .results-grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr))}
      .player-main{padding:12px 16px}
      .player-info{max-width:200px}
      .controls-buttons{gap:12px}
      .ctrl-btn{width:40px;height:40px}
      .ctrl-btn.play{width:48px;height:48px}
    }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="grain"></div>
  
  <!-- Header -->
  <header class="header">
    <div class="header-inner">
      <img src="/assets/logo.png" alt="JaSH MusiC" class="logo-sm">
      <span class="brand">JaSH MusiC</span>
      <div class="search-bar">
        <input type="text" class="search-input" id="searchInput" placeholder="Search songs, artists, albums..." />
        <span class="search-icon">🔍</span>
      </div>
      <div class="filter-pills">
        <button class="pill" data-filter="">All</button>
        <button class="pill active" data-filter="songs">Songs</button>
        <button class="pill" data-filter="artists">Artists</button>
        <button class="pill" data-filter="albums">Albums</button>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="main">
    <!-- Home: Tamil Directors Gallery -->
    <div class="home" id="homeView">
      <div class="hero-section">
        <h1 class="hero-title">Discover Tamil Music</h1>
        <p class="hero-subtitle">Explore legendary music directors and their timeless creations</p>
      </div>
      
      <div class="directors-section">
        <div class="section-header">
          <div>
            <h2 class="section-title">Legendary Tamil Music Directors</h2>
            <p class="section-subtitle">Click on any director to explore their music</p>
          </div>
        </div>
        <div class="directors-grid" id="directorsGrid"></div>
      </div>
    </div>

    <!-- Search Results -->
    <div class="results-container" id="resultsView">
      <div class="results-header">
        <div>
          <h2 class="results-title" id="resultsTitle">Search Results</h2>
          <p class="results-count" id="resultsCount"></p>
        </div>
        <button class="back-btn" onclick="goHome()">← Back to Home</button>
      </div>
      <div class="loading" id="loadingState">Searching</div>
      <div class="empty" id="emptyState" style="display:none">No results found</div>
      <div class="results-grid" id="resultsGrid"></div>
    </div>
  </main>

  <!-- Enhanced Player -->
  <div class="player" id="player">
    <canvas class="visualizer" id="visualizer" width="1400" height="100"></canvas>
    <div class="player-main">
      <img class="player-thumb" id="playerThumb" src="" alt="">
      <div class="player-info">
        <div class="player-title" id="playerTitle">-</div>
        <div class="player-artist" id="playerArtist">-</div>
      </div>
      
      <div class="player-controls">
        <div class="controls-buttons">
          <button class="ctrl-btn" id="shuffleBtn" onclick="toggleShuffle()" title="Shuffle">🔀</button>
          <button class="ctrl-btn" onclick="playPrevious()">⏮</button>
          <button class="ctrl-btn play" id="playBtn" onclick="togglePlay()">▶</button>
          <button class="ctrl-btn" onclick="playNext()">⏭</button>
          <button class="ctrl-btn" id="repeatBtn" onclick="toggleRepeat()" title="Repeat">🔁</button>
        </div>
        <div class="progress-container">
          <span class="time" id="currentTime">0:00</span>
          <div class="progress-bar" id="progressBar" onclick="seekTo(event)">
            <div class="progress-fill" id="progressFill"></div>
            <div class="progress-dot"></div>
          </div>
          <span class="time" id="totalTime">0:00</span>
        </div>
      </div>

      <div class="player-right">
        <div class="volume-container">
          <span class="volume-icon" onclick="toggleMute()">🔊</span>
          <div class="volume-slider" onclick="setVolume(event)">
            <div class="volume-fill" id="volumeFill"></div>
          </div>
        </div>
        <button class="lyrics-btn" id="lyricsBtn" onclick="toggleLyrics()">Lyrics</button>
        <button class="queue-btn" id="queueBtn" onclick="toggleQueue()">Queue</button>
      </div>
    </div>
  </div>

  <!-- Lyrics Panel -->
  <div class="lyrics-panel" id="lyricsPanel">
    <div class="lyrics-header">
      <span class="lyrics-title">Lyrics</span>
      <span class="lyrics-close" onclick="toggleLyrics()">×</span>
    </div>
    <div class="lyrics-content" id="lyricsContent">
      <p style="color:var(--muted);text-align:center;padding:40px 20px">No lyrics available</p>
    </div>
  </div>

  <!-- Queue Panel -->
  <div class="queue-panel" id="queuePanel">
    <div class="queue-header">
      <span class="queue-title">Queue</span>
      <span class="queue-close" onclick="toggleQueue()">×</span>
    </div>
    <div class="queue-list" id="queueList"></div>
  </div>

  <div id="ytplayer"></div>

  <script>
    // Disable console
    (function(){
      const noop = () => {};
      Object.keys(console).forEach(k => console[k] = noop);
      window.onerror = () => true;
      window.onunhandledrejection = e => { e.preventDefault(); return true; };
    })();

    // Tamil Music Directors Data
    const tamilDirectors = [
      { name: 'Ilaiyaraaja', photo: '/assets/directors/ilaiyaraaja.jpg', query: 'Ilaiyaraaja' },
      { name: 'Deva', photo: '/assets/directors/deva.jpg', query: 'Deva composer' },
      { name: 'A.R. Rahman', photo: '/assets/directors/ar-rahman.jpg', query: 'A.R. Rahman' },
      { name: 'Harris Jayaraj', photo: '/assets/directors/harris-jayaraj.jpg', query: 'Harris Jayaraj' },
      { name: 'Yuvan Shankar Raja', photo: '/assets/directors/yuvan-shankar-raja.jpg', query: 'Yuvan Shankar Raja' },
      { name: 'Anirudh Ravichander', photo: '/assets/directors/anirudh.jpg', query: 'Anirudh Ravichander' },
      { name: 'D. Imman', photo: '/assets/directors/d-imman.jpg', query: 'D. Imman' },
      { name: 'G.V. Prakash Kumar', photo: '/assets/directors/gv-prakash.jpg', query: 'G.V. Prakash Kumar' },
      { name: 'Vidyasagar', photo: '/assets/directors/vidyasagar.jpg', query: 'Vidyasagar' },
      { name: 'Devi Sri Prasad', photo: '/assets/directors/devi-sri-prasad.jpg', query: 'Devi Sri Prasad' },
      { name: 'Santhosh Narayanan', photo: '/assets/directors/santhosh-narayanan.jpg', query: 'Santhosh Narayanan' },
      { name: 'Hiphop Tamizha', photo: '/assets/directors/hiphop-tamizha.jpg', query: 'Hiphop Tamizha' },
      { name: 'Sean Roldan', photo: '/assets/directors/sean-roldan.jpg', query: 'Sean Roldan' },
    ];

    // Render Directors Grid
      function renderDirectors() {
      const grid = document.getElementById('directorsGrid');
      grid.innerHTML = tamilDirectors.map(director => {
        // Generate gradient background for placeholder
        const colors = ['#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#6366f1', '#8b5cf6', '#a855f7', '#ec4899'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const initial = director.name.charAt(0);
        
        return \`
          <div class="director-card" onclick="searchDirector('\${director.query}')">
            <div class="director-photo-wrapper" style="position:relative;width:100%;aspect-ratio:1;overflow:hidden;background:linear-gradient(135deg, \${color}33, \${color}66)">
              <img 
                class="director-photo" 
                src="\${director.photo}" 
                alt="\${director.name}" 
                loading="lazy"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
              >
              <div style="display:none;position:absolute;inset:0;align-items:center;justify-content:center;font-size:4rem;font-weight:700;color:\${color}">\${initial}</div>
            </div>
            <div class="director-overlay">
              <div class="director-name">\${director.name}</div>
              <div class="director-role">Music Director</div>
            </div>
          </div>
        \`;
      }).join('');
    }

    // State Management
    let currentFilter = 'songs';
    let searchResults = [];
    let queue = [];
    let currentIndex = -1;
    let isPlaying = false;
    let isShuffleOn = false;
    let repeatMode = 0; // 0: off, 1: all, 2: one
    let ytPlayer = null;
    let playerReady = false;
    let progressInterval = null;
    let currentLyrics = null;
    let audioContext = null;
    let analyser = null;
    let visualizerRunning = false;

    // YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    function onYouTubeIframeAPIReady() {
      ytPlayer = new YT.Player('ytplayer', {
        height: '0',
        width: '0',
        host: 'https://www.youtube-nocookie.com',
        playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1, rel: 0 },
        events: {
          onReady: () => { playerReady = true; initAudioContext(); },
          onStateChange: onPlayerStateChange,
          onError: handlePlayerError
        }
      });
    }

    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.PLAYING) {
        isPlaying = true;
        document.getElementById('playBtn').textContent = '⏸';
        startProgressTracking();
        startVisualizer();
      } else if (event.data === YT.PlayerState.PAUSED) {
        isPlaying = false;
        document.getElementById('playBtn').textContent = '▶';
        stopProgressTracking();
      } else if (event.data === YT.PlayerState.ENDED) {
        handleTrackEnd();
      }
    }

    function handlePlayerError(event) {
      const track = queue[currentIndex];
      if (!track) return;
      
      // Try fallback video ID
      if (event.data === 150 || event.data === 101 || event.data === 100) {
        if (track.fallbackVideoId && !track.triedFallback) {
          track.triedFallback = true;
          ytPlayer.loadVideoById(track.fallbackVideoId);
        } else if (!track.triedSearch) {
          track.triedSearch = true;
          searchYouTubeFallback(track.title, track.artists?.[0]?.name || '');
        } else {
          playNext();
        }
      }
    }

    async function searchYouTubeFallback(title, artist) {
      try {
        const res = await fetch(\`/api/yt_search?q=\${encodeURIComponent(title + ' ' + artist + ' official')}&filter=videos\`);
        const data = await res.json();
        const alt = data.results?.find(v => v.channel?.name && !v.channel.name.includes('Topic') && v.id);
        if (alt) ytPlayer.loadVideoById(alt.id);
        else playNext();
      } catch {
        playNext();
      }
    }

    function handleTrackEnd() {
      isPlaying = false;
      stopProgressTracking();
      if (repeatMode === 2) {
        playTrack(currentIndex);
      } else {
        playNext();
      }
    }

    // Audio Visualizer
    function initAudioContext() {
      try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 128;
        const source = audioContext.createMediaElementSource(ytPlayer.getIframe());
        source.connect(analyser);
        analyser.connect(audioContext.destination);
      } catch (e) {}
    }

    function startVisualizer() {
      if (!analyser || visualizerRunning) return;
      visualizerRunning = true;
      drawVisualizer();
    }

    function drawVisualizer() {
      if (!visualizerRunning || !analyser) return;
      
      const canvas = document.getElementById('visualizer');
      const ctx = canvas.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      function render() {
        if (!visualizerRunning) return;
        requestAnimationFrame(render);
        
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = 'rgba(5, 5, 5, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / bufferLength) * 2;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height * 0.8;
          const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
          gradient.addColorStop(0, '#10b981');
          gradient.addColorStop(1, '#14f195');
          ctx.fillStyle = gradient;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      }
      render();
    }

    // Search & Directors
    function searchDirector(name) {
      document.getElementById('searchInput').value = name;
      currentFilter = 'songs';
      updateFilterPills();
      performSearch(name, 'songs');
    }

    document.getElementById('searchInput').addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) performSearch(query, currentFilter);
      }
    });

    document.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        currentFilter = pill.dataset.filter;
        updateFilterPills();
        const query = document.getElementById('searchInput').value.trim();
        if (query) performSearch(query, currentFilter);
      });
    });

    function updateFilterPills() {
      document.querySelectorAll('.pill').forEach(p => {
        p.classList.toggle('active', p.dataset.filter === currentFilter);
      });
    }

    async function performSearch(query, filter) {
      showResults();
      document.getElementById('loadingState').style.display = 'block';
      document.getElementById('emptyState').style.display = 'none';
      document.getElementById('resultsGrid').innerHTML = '';
      
      try {
        let url = \`/api/search?q=\${encodeURIComponent(query)}\`;
        if (filter) url += \`&filter=\${filter}\`;
        
        const res = await fetch(url);
        const data = await res.json();
        searchResults = data.results || [];
        
        document.getElementById('loadingState').style.display = 'none';
        
        if (searchResults.length === 0) {
          document.getElementById('emptyState').style.display = 'block';
        } else {
          renderResults();
        }
        
        document.getElementById('resultsTitle').textContent = filter ? \`\${capitalize(filter)}\` : 'All Results';
        document.getElementById('resultsCount').textContent = \`\${searchResults.length} results for "\${query}"\`;
      } catch (e) {
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('emptyState').style.display = 'block';
      }
    }

    function renderResults() {
      const grid = document.getElementById('resultsGrid');
      grid.innerHTML = searchResults.map((item, index) => {
        const type = item.resultType || 'song';
        const thumb = item.thumbnails?.[0]?.url || (item.videoId ? \`https://img.youtube.com/vi/\${item.videoId}/mqdefault.jpg\` : 'https://via.placeholder.com/200/1a1a1a/10b981?text=♪');
        const title = item.title || item.name || 'Unknown';
        const artist = item.artists?.map(a => a.name).join(', ') || item.subtitle || '';
        const duration = item.duration || '';
        
        let clickAction = '';
        if (item.videoId && (type === 'song' || type === 'video')) {
          clickAction = \`onclick="addToQueueAndPlay(\${index})"\`;
        } else if (item.browseId) {
          if (type === 'artist' || item.browseId.startsWith('UC')) {
            clickAction = \`onclick="viewArtist('\${item.browseId}', '\${encodeURIComponent(thumb)}', '\${encodeURIComponent(title)}')"\`;
          } else if (type === 'album' || item.browseId.startsWith('MPRE')) {
            clickAction = \`onclick="viewAlbum('\${item.browseId}', '\${encodeURIComponent(thumb)}', '\${encodeURIComponent(title)}')"\`;
          } else if (type === 'playlist' || item.browseId.startsWith('VL') || item.browseId.startsWith('RDCLAK')) {
            clickAction = \`onclick="viewPlaylist('\${item.browseId}', '\${encodeURIComponent(thumb)}', '\${encodeURIComponent(title)}')"\`;
          }
        }
        
        return \`
          <div class="track-card" \${clickAction}>
            <img class="track-thumb" src="\${thumb}" alt="\${title}" loading="lazy">
            <div class="track-info">
              <div class="track-title">\${escapeHtml(title)}</div>
              <div class="track-artist">\${escapeHtml(artist)}</div>
            </div>
            <div class="track-meta">
              <span class="track-type">\${type}</span>
              <span class="track-duration">\${duration}</span>
            </div>
          </div>
        \`;
      }).join('');
    }

    function addToQueueAndPlay(index) {
      const track = searchResults[index];
      if (!track || !track.videoId) return;
      
      queue = searchResults.filter(t => t.videoId);
      currentIndex = queue.findIndex(t => t.videoId === track.videoId);
      playTrack(currentIndex);
      updateQueueDisplay();
    }

    async function viewArtist(browseId, thumbEnc, nameEnc) {
      document.getElementById('loadingState').style.display = 'block';
      document.getElementById('resultsGrid').innerHTML = '';
      
      try {
        const res = await fetch(\`/api/artists/\${encodeURIComponent(browseId)}\`);
        const data = await res.json();
        
        searchResults = [
          ...(data.topSongs || []).map(s => ({ ...s, resultType: 'song', thumbnails: [{ url: s.thumbnail }] })),
          ...(data.albums || []).map(a => ({ ...a, resultType: 'album', thumbnails: [{ url: a.thumbnail }] })),
          ...(data.singles || []).map(s => ({ ...s, resultType: 'album', thumbnails: [{ url: s.thumbnail }] }))
        ];
        
        document.getElementById('resultsTitle').textContent = decodeURIComponent(nameEnc) || data.artist?.name || 'Artist';
        document.getElementById('resultsCount').textContent = \`\${searchResults.length} items\`;
        renderResults();
      } catch (e) {
        document.getElementById('emptyState').style.display = 'block';
      }
      
      document.getElementById('loadingState').style.display = 'none';
    }

    async function viewAlbum(browseId, thumbEnc, nameEnc) {
      document.getElementById('loadingState').style.display = 'block';
      document.getElementById('resultsGrid').innerHTML = '';
      
      try {
        const res = await fetch(\`/api/albums/\${encodeURIComponent(browseId)}\`);
        const data = await res.json();
        const albumThumb = decodeURIComponent(thumbEnc) || data.album?.thumbnail || data.thumbnails?.[0]?.url;
        
        searchResults = (data.tracks || []).map(t => ({ 
          ...t, 
          resultType: 'song', 
          thumbnails: [{ url: albumThumb }] 
        }));
        
        document.getElementById('resultsTitle').textContent = decodeURIComponent(nameEnc) || data.album?.title || 'Album';
        document.getElementById('resultsCount').textContent = \`\${searchResults.length} tracks\`;
        renderResults();
      } catch (e) {
        document.getElementById('emptyState').style.display = 'block';
      }
      
      document.getElementById('loadingState').style.display = 'none';
    }

    async function viewPlaylist(browseId, thumbEnc, nameEnc) {
      document.getElementById('loadingState').style.display = 'block';
      document.getElementById('resultsGrid').innerHTML = '';
      
      try {
        const playlistId = browseId.startsWith('VL') ? browseId.substring(2) : browseId;
        const res = await fetch(\`/api/playlists/\${encodeURIComponent(playlistId)}\`);
        const data = await res.json();
        
        searchResults = (data.tracks || []).map(t => ({ ...t, resultType: 'song' }));
        
        document.getElementById('resultsTitle').textContent = decodeURIComponent(nameEnc) || data.title || 'Playlist';
        document.getElementById('resultsCount').textContent = \`\${searchResults.length} tracks\`;
        renderResults();
      } catch (e) {
        document.getElementById('emptyState').style.display = 'block';
      }
      
      document.getElementById('loadingState').style.display = 'none';
    }

    function showResults() {
      document.getElementById('homeView').style.display = 'none';
      document.getElementById('resultsView').classList.add('active');
    }

    function goHome() {
      document.getElementById('resultsView').classList.remove('active');
      document.getElementById('homeView').style.display = 'flex';
      document.getElementById('searchInput').value = '';
      searchResults = [];
    }

    // Player Controls
    function playTrack(index) {
      if (!playerReady || index < 0 || index >= queue.length) return;
      
      const track = queue[index];
      currentIndex = index;
      
      document.getElementById('playerTitle').textContent = track.title || 'Unknown';
      document.getElementById('playerArtist').textContent = track.artists?.map(a => a.name).join(', ') || '';
      document.getElementById('playerThumb').src = track.thumbnails?.[0]?.url || \`https://img.youtube.com/vi/\${track.videoId}/mqdefault.jpg\`;
      document.getElementById('player').classList.add('visible');
      
      ytPlayer.loadVideoById(track.videoId);
      isPlaying = true;
      updateQueueDisplay();
      loadLyrics(track.title, track.artists?.[0]?.name);
    }

    function togglePlay() {
      if (!playerReady) return;
      isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
    }

    function playNext() {
      let nextIndex;
      if (repeatMode === 2) {
        nextIndex = currentIndex;
      } else if (isShuffleOn) {
        nextIndex = Math.floor(Math.random() * queue.length);
      } else {
        nextIndex = currentIndex + 1;
        if (nextIndex >= queue.length) {
          if (repeatMode === 1) nextIndex = 0;
          else return;
        }
      }
      playTrack(nextIndex);
    }

    function playPrevious() {
      if (currentIndex > 0) playTrack(currentIndex - 1);
    }

    function toggleShuffle() {
      isShuffleOn = !isShuffleOn;
      document.getElementById('shuffleBtn').classList.toggle('active', isShuffleOn);
    }

    function toggleRepeat() {
      repeatMode = (repeatMode + 1) % 3;
      const btn = document.getElementById('repeatBtn');
      btn.classList.toggle('active', repeatMode > 0);
      btn.textContent = repeatMode === 2 ? '🔂' : '🔁';
    }

    function seekTo(event) {
      if (!playerReady) return;
      const bar = document.getElementById('progressBar');
      const rect = bar.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      ytPlayer.seekTo(percent * (ytPlayer.getDuration() || 0), true);
    }

    function setVolume(event) {
      if (!playerReady) return;
      const slider = event.currentTarget;
      const rect = slider.getBoundingClientRect();
      const percent = (event.clientX - rect.left) / rect.width;
      ytPlayer.setVolume(percent * 100);
      document.getElementById('volumeFill').style.width = (percent * 100) + '%';
    }

    function toggleMute() {
      if (!playerReady) return;
      ytPlayer.isMuted() ? ytPlayer.unMute() : ytPlayer.mute();
    }

    // Progress Tracking
    function startProgressTracking() {
      stopProgressTracking();
      progressInterval = setInterval(updateProgress, 500);
    }

    function stopProgressTracking() {
      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    }

    function updateProgress() {
      if (!playerReady) return;
      const current = ytPlayer.getCurrentTime() || 0;
      const total = ytPlayer.getDuration() || 0;
      
      document.getElementById('currentTime').textContent = formatTime(current);
      document.getElementById('totalTime').textContent = formatTime(total);
      document.getElementById('progressFill').style.width = total > 0 ? ((current / total) * 100) + '%' : '0%';
      
      // Update synced lyrics
      if (currentLyrics?.synced) {
        updateSyncedLyrics(current);
      }
    }

    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return \`\${mins}:\${secs < 10 ? '0' : ''}\${secs}\`;
    }

    // Lyrics
    async function loadLyrics(title, artist) {
      if (!title || !artist) return;
      
      try {
        const res = await fetch(\`/api/lyrics?title=\${encodeURIComponent(title)}&artist=\${encodeURIComponent(artist)}\`);
        const data = await res.json();
        
        if (data.success) {
          currentLyrics = {
            plain: data.plainLyrics,
            synced: data.syncedLyrics ? parseLRC(data.syncedLyrics) : null
          };
          displayLyrics();
        } else {
          currentLyrics = null;
          document.getElementById('lyricsContent').innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 20px">No lyrics available</p>';
        }
      } catch {
        currentLyrics = null;
      }
    }

    function parseLRC(lrc) {
      const lines = lrc.split('\\n');
      const parsed = [];
      
      lines.forEach(line => {
        const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
        if (match) {
          const mins = parseInt(match[1]);
          const secs = parseInt(match[2]);
          const ms = parseInt(match[3].padEnd(3, '0'));
          const time = mins * 60 + secs + ms / 1000;
          const text = match[4].trim();
          if (text) parsed.push({ time, text });
        }
      });
      
      return parsed.sort((a, b) => a.time - b.time);
    }

    function displayLyrics() {
      const content = document.getElementById('lyricsContent');
      
      if (currentLyrics?.synced) {
        content.innerHTML = currentLyrics.synced.map((line, i) => 
          \`<div class="lyrics-line" data-time="\${line.time}" data-index="\${i}">\${escapeHtml(line.text)}</div>\`
        ).join('');
      } else if (currentLyrics?.plain) {
        content.innerHTML = \`<div style="white-space:pre-line;line-height:2">\${escapeHtml(currentLyrics.plain)}</div>\`;
      } else {
        content.innerHTML = '<p style="color:var(--muted);text-align:center;padding:40px 20px">No lyrics available</p>';
      }
    }

    function updateSyncedLyrics(currentTime) {
      if (!currentLyrics?.synced) return;
      
      const lines = document.querySelectorAll('.lyrics-line');
      let activeIndex = -1;
      
      for (let i = 0; i < currentLyrics.synced.length; i++) {
        if (currentTime >= currentLyrics.synced[i].time) {
          activeIndex = i;
        } else {
          break;
        }
      }
      
      lines.forEach((line, i) => {
        line.classList.toggle('active', i === activeIndex);
      });
      
      if (activeIndex >= 0 && lines[activeIndex]) {
        lines[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    function toggleLyrics() {
      const panel = document.getElementById('lyricsPanel');
      const btn = document.getElementById('lyricsBtn');
      const isVisible = panel.classList.toggle('visible');
      btn.classList.toggle('active', isVisible);
      
      if (isVisible) {
        document.getElementById('queuePanel').classList.remove('visible');
        document.getElementById('queueBtn').classList.remove('active');
      }
    }

    // Queue
    function updateQueueDisplay() {
      const list = document.getElementById('queueList');
      list.innerHTML = queue.map((track, i) => {
        const thumb = track.thumbnails?.[0]?.url || \`https://img.youtube.com/vi/\${track.videoId}/mqdefault.jpg\`;
        const isPlaying = i === currentIndex;
        
        return \`
          <div class="queue-item \${isPlaying ? 'playing' : ''}" onclick="playTrack(\${i})">
            <span class="queue-number">\${i + 1}</span>
            <img class="queue-thumb" src="\${thumb}" alt="">
            <div class="queue-info">
              <div class="queue-name">\${escapeHtml(track.title)}</div>
              <div class="queue-artist">\${escapeHtml(track.artists?.map(a => a.name).join(', ') || '')}</div>
            </div>
          </div>
        \`;
      }).join('');
    }

    function toggleQueue() {
      const panel = document.getElementById('queuePanel');
      const btn = document.getElementById('queueBtn');
      const isVisible = panel.classList.toggle('visible');
      btn.classList.toggle('active', isVisible);
      
      if (isVisible) {
        document.getElementById('lyricsPanel').classList.remove('visible');
        document.getElementById('lyricsBtn').classList.remove('active');
      }
    }

    // Utilities
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Initialize
    renderDirectors();
  </script>
</body>
</html>`;
export function getSongs() {
    const mockSongs = [
        { 
            location: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            trackIndex: 0,
            artist: 'Rick Astley',
            title: 'Never Gonna Give You Up',
            album: '' 
        },
        {
            location: 'https://www.youtube.com/watch?v=OOf_FnHd3hc',
            trackIndex: 1,
            artist: 'Camellia',
            title: 'ill intelligence',
            album: '' 
        },
        {
            location: 'https://www.youtube.com/watch?v=IxEIQQkhyeI',
            trackIndex: 2,
            artist: 'Louis Cole',
            title: 'F it up',
            album: ''
        },
        {
            location: 'https://soundcloud.com/frums/orthoplexed',
            trackIndex: 3,
            artist: 'Frums',
            title: 'Orthoplexed',
            album: '',
            albumArtSrc: 'https://i1.sndcdn.com/artworks-vYU6jiIec2y5dHZ4-dOwzzw-t500x500.jpg'
        },
        {
            location: 'https://soundcloud.com/drive-45/everything-i-own',
            trackIndex: 4,
            artist: 'Drive45',
            title: 'Everything I Own',
            album: '',
            albumArtSrc: 'https://i1.sndcdn.com/artworks-bwjGwYyYgpK1lWfB-x3c9uw-t500x500.jpg'
        },
        {
            location: 'https://soundcloud.com/tom_atom/solid-color',
            trackIndex: 5,
            artist: 'tom_atom',
            title: 'solid color',
            album: '',
            albumArtSrc: 'https://i1.sndcdn.com/avatars-000279488393-6q6f3m-t500x500.jpg'
        },
        {
            location: 'https://soundcloud.com/alyjameslab/snake-charmer-ym2612-fmdrive',
            trackIndex: 6,
            artist: 'AlyJaMesLaB',
            title: 'Snake Charmer YM2612 (FMDrive VST + SPSG)',
            album: '',
            albumArtSrc: 'https://i1.sndcdn.com/artworks-000074443168-v8l41y-t500x500.jpg'
        },
        {
            location: 'https://soundcloud.com/aran_07/aran-pumppump',
            trackIndex: 7,
            artist: 'aran',
            title: 'aran - PUMP*PUMP',
            album: '',
            albumArtSrc: 'https://i1.sndcdn.com/artworks-000140178347-86k53z-t500x500.jpg'
        },
    ]
    return Promise.resolve(mockSongs);
}
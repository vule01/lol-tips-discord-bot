const getLore = async (championName) => {
    try{
        const champion = await getChampionData(championName);
        return champion.lore;
    } catch (e) {
        return `Failed to retrieve the lore: ${e}`;
    }
};

const getTips = async (championName, playing) => {
    try{
        const champion = await getChampionData(championName);
        const tips = playing? "allytips" : "enemytips";
        if(champion[tips].length == 0){
            return "No tips available, try a different champion?";
        }

        let random = Math.floor(Math.random() * (champion[tips].length))
        return champion[tips][random];
    } catch (e) {
        return `Failed to retrieve the lore: ${e}`;
    }
};

const getChampionData = async (championName) => {
    championName = cleanName(championName);
    const response = await fetch(`${process.env.CHAMPION_URL}${championName}.json`);
    if (response.status === 403) {
        throw new InvalidChampionException();
    }
    const champion = await response.json();
    return champion.data[championName];
};

const cleanName = (name) => {
    name = name.toLowerCase().replace(/[^a-z]/gi, '');

    if( name == ('reksai') ){
        return 'RekSai';
    } else if ( name.includes('nunu') ) {
        return 'Nunu';
    }
    
    return name.charAt(0).toUpperCase() + name.slice(1);
};

module.exports = { getLore, getTips };
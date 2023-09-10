const getLore = async (championName) => {
    championName = cleanName(championName);
    try{
        const response = await fetch(`${process.env.CHAMPION_URL}${championName}.json`);
        if (response.status === 403) {
            return 'Invalid champion name';
        }
        const champion = await response.json();
        return champion.data[championName].lore;
    } catch (error) {
        return 'Failed to retrieve the lore'
    }
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

module.exports = { getLore };
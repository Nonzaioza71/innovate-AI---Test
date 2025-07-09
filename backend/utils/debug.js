function formatSQL(query, values) {
    let i = 0;
    return query.replace(/\?/g, () => {
        const val = values[i++];
        if (typeof val === 'string') return `'${val}'`;
        if (val === null || val === undefined) return 'NULL';
        return val;
    });
}

module.exports = { formatSQL }
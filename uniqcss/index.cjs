module.exports = (options) => {
    return {
        name: "uniqcss",
        setup: async (build) => {
            const { setup } = await import('./index.js');
            setup(build, options);
        }
    };
};
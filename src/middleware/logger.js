const logger = (store) => (next) => (action) => {
    console.log('Action:', action);
    const returnValue = next(action);
    console.log('New state:', store.getState());

    return returnValue;
}

export default logger;
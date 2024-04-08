exports.handler = async (event) => {
    console.log("Event received:", event);

    return { status: 'Email sent successfully' };
};
import fetch from 'node-fetch'

export const authService = async (email, password) => {
    let result;
    try {
        result = await fetch(
            'https://tml-report.herokuapp.com/users/login',
            {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers:
                {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await result.json();
        return data.data;
    }
    catch (e) {
        console.log(e);
    }
};
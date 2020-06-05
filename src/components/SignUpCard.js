import React from 'react';

const SignUpCard = () => {
    return (
        <aside className='col-xl-3 col-lg-6 col-md-8 col-sm-10 offset-sm-1 offset-md-2 offset-lg-3 offset-xl-0 order-xl-1 mb-2'>
            <div className='card text-center border-primary'>
                <div className='card-header bg-white border-primary'>
                    <span role='img' aria-label='bread'>🍞 </span>
                            Welcome to BREADS
                    <span role='img' aria-label='bread'> 🍞</span>
                </div>
                <div className='card-body'>
                    <h5 className='card-title'>Keep track of what you read online</h5>
                    <h6>Sign up above
                        <span role='img' aria-label='up-arrow'> ⬆️</span>
                    </h6>
                </div>
            </div>
        </aside>
    )
}

export default SignUpCard;
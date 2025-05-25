import PropertySearchForm from "./PropertySearchForm"

const Hero = () => {
    return (
        <section className="bg-blue-700 py-20 mb-4 h-[425px] flex items-center"
            style={{
                backgroundImage: `linear-gradient(to right,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="text-center">
                    <h1 className="text-4xl mb-4 md:mb-0 font-extrabold text-white sm:text-5xl md:text-6xl">
                        Find The Perfect <span className="text-blue-500">Rental</span>
                    </h1>
                    <p className="my-4 text-lg md:text-xl text-white">
                        Discover the perfect property that suits your needs.
                    </p>
                </div>

                {/* Form Component  */}
                <PropertySearchForm />
            </div>
        </section>
    )
}

export default Hero

import PropertyAddForm from "@/components/PropertyAddForm";

const AddPropertyPage = () => {
    return (
        <section className="bg-blue-50">
            <div className="container m-auto max-w-lg md:max-w-2xl py-24">
                <div className="bg-white px-10 py-12 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <PropertyAddForm />
                </div>
            </div>
        </section>
    );
}

export default AddPropertyPage;
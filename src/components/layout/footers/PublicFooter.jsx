const PublicFooter = () => {
    return (
        <footer className="bg-white shadow-inner py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="text-center text-gray-500">
                © {new Date().getFullYear()} DINEMATE. All rights reserved.
            </p>
            </div>
        </footer>
    )
}

export default PublicFooter;
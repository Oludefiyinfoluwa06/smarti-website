import { OrderForm } from "@/components/pages/order/OrderForm";

export default function OrderPage({
  searchParams,
}: {
  searchParams: { package?: string };
}) {
  return (
    <div className="min-h-screen py-24" style={{ background: 'linear-gradient(135deg, #FBFAF7 0%, #F5F4F0 50%, #FBFAF7 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#0F0820' }}>
            Place Your
            <span className="block" style={{ background: 'linear-gradient(135deg, #241153, #1a0d3f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Study Package Order
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fill in your details below to order your study package.
            All packages include free delivery within Nigeria.
          </p>
        </div>

        <OrderForm
          defaultPackage={
            searchParams.package === 'StudyLite' ? 'StudyLite' :
              searchParams.package === 'StudyPro' ? 'StudyPro' :
                undefined
          }
        />
      </div>
    </div>
  );
}

import { Suspense } from 'react'
import BurgerBuilder from '@/components/BurgerBuilder'

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-10 text-orange-800">Loading builder…</div>}>
      <BurgerBuilder />
    </Suspense>
  )
}

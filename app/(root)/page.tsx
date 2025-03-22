import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/actions/auth.action'
import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async() => {
  const user = await getCurrentUser()
  
  const [userInterviews, latestInterviews] = await Promise.all([ //Promise.all() helps to fetch data in parallel
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({userId: user?.id!})
  ]) 


  const hasPastInterviews = userInterviews?.length > 0
  const hasUpcomingInterviews = latestInterviews?.length > 0

  return (
    <>
      <section className="card-cta">
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Make yourself more confident within AI-Powered Practice & Feedback</h2>
          <p className="text-lg">Practice  real interview question and get instant Feedback</p>
          <Button asChild className="btn-primary max-sm w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden" />
      </section>
      <section className="flex flex-col gap-6 mt-8">
          <h2>Your Interviews</h2>
          <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                {...interview}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet!</p>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Take and Interview</h2>
        <div className='interviews-section'>
        {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard
                key={interview.id}
                {...interview}
              />
            ))
          ) : (
            <p>There are no new intervies available.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default page
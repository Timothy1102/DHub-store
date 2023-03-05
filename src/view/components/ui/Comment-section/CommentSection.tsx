import React from 'react'
import { CommentSection } from 'react-comments-section'
import 'react-comments-section/dist/index.css'
import { useState } from 'react'

// only demo data for now
const CustomComponent = () => {
  const [data] = useState([
    {
      userId: '01a',
      comId: '012',
      fullName: '0x9D3...8B4',
      avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'Great dApp! ',
      replies: [
        {
          userId: '02a',
          comId: '013',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          fullName: '0x76B...15A',
          avatarUrl: 'https://ui-avatars.com/api/name=Adam&background=random',
          text: 'Thanks! It took me 1 month to finish this project but I am glad it helped out someone!🥰'
        },
        {
          userId: '01a',
          comId: '014',
          userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
          fullName: 'Riya Negi',
          avatarUrl: 'https://ui-avatars.com/api/name=Riya&background=random',
          text: 'thanks!😊'
        }
      ]
    },
    {
      userId: '02b',
      comId: '017',
      fullName: 'Lily',
      userProfile: 'https://www.linkedin.com/in/riya-negi-8879631a9/',
      text: 'Can I create NFTs with this? 🤔',
      avatarUrl: 'https://ui-avatars.com/api/name=Lily&background=random',
      replies: []
    }
  ])

  const customNoComment = () => (
    <div className='no-com'>No comments.</div>
  )
  return (
    <div style={{ width: '100%' }}>
      <CommentSection
        currentUser={{
          currentUserId: '03',
          currentUserImg:
            'https://ui-avatars.com/api/name=Riya&background=random',
          currentUserProfile:
            'https://www.linkedin.com/in/riya-negi-8879631a9/',
          currentUserFullName: 'You'
        }}
        hrStyle={{ border: '0.5px solid #ff0072' }}
        titleStyle={{ color: '#f2f2f2' }}
        commentsCount={4}
        commentData={data}
        logIn={{
          loginLink: 'http://localhost:3001/',
          signupLink: 'http://localhost:3001/'
        }}
        onSubmitAction={(data: {
          userId: string
          comId: string
          avatarUrl: string
          userProfile?: string
          fullName: string
          text: string
          replies: any
        }) => console.log('check submit, ', data)}
        onDeleteAction={(data: any) => console.log('comment was deleted', data)}
        onReplyAction={(data: {
          userId: string
          parentOfRepliedCommentId: string
          repliedToCommentId: string
          avatarUrl: string
          userProfile?: string
          fullName: string
          text: string
        }) => console.log('check reply, ', data)}
        onEditAction={(data: any) => console.log('check edit', data)}
        customNoComment={() => customNoComment()}
        imgStyle={{ borderRadius: '30%' }}
        customImg='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=60'
        inputStyle={{}}
        formStyle={{ backgroundColor: 'black' }}
        submitBtnStyle={{ border: '1px solid black', backgroundColor: 'black' }}
        cancelBtnStyle={{
          border: '1px solid gray',
          backgroundColor: 'gray',
          color: 'white'
        }}
        removeEmoji={true}
        overlayStyle={{color: 'white' }}
        replyInputStyle={{ borderBottom: '1px solid black', color: 'white' }}
      />
    </div>
  )
}

export default CustomComponent
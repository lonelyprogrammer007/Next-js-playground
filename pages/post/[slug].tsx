import { GetStaticProps } from 'next'
import client from '../../client'
import { Post } from '../../types'

type Props = {
	post: Post
}

const PostComponent = ({ post }: Props) => {
	console.log(post)
	return <div>Post</div>
}

export default PostComponent

export const getStaticPaths = async () => {
	const query = `*[_type == "post"] {
		_id,
		slug
	  }`
	const posts = await client.fetch(query)
	const paths = posts.map((post: Post) => ({
		params: {
			slug: post.slug.current,
		},
	}))
	return {
		paths,
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == "post" && slug.current == $slug][0] {
		_id,
		_createdAt,
		title,
		author -> {
			name,
			image
		},
		'comments': *[
			_type == "comment" &&
			post._ref == ^._id &&
			approved == true
		],
		description,
		mainImage,
		slug,
		body
	}`

	const post = await client.fetch(query, {
		slug: params?.slug,
	})

	if (!post) {
		return {
			notFound: true,
		}
	}

	return {
		props: {
			post,
		},
	}
}

export default function UserPage({
	params,
}: {
	params: { "@user_name": string };
}) {
	return (
		<div>
			<h1>User {params["@user_name"].replace("%40", "@")}</h1>
		</div>
	);
}

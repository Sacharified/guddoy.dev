import findAnagrams from "anagram-solver";
import React from "react";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { InputContainer } from "components/form";
import { Container } from "components/layout";
import Paper from "@material-ui/core/Paper";
import { getDefinition } from "api/services/dictionary";

class AnagramFinder extends React.Component {
	state = {
		anagrams: [],
		anagramQuery: "",
		definitionErrors: []
	}

	constructor(props) {
		super(props);

		this.findAnagrams = this.findAnagrams.bind(this);
	}

	async findAnagrams({ target: { value = "" } }) {
		const anagrams = await findAnagrams(value);
		this.setState(() => ({ anagrams, anagramQuery: value }));
	}

	async showDefinition(word) {
		const { definition, definitionErrors } = this.state;
		try {
			if (!definitionErrors.includes(word) && (!definition || (definition && definition.id !== word))) {
				const data = await getDefinition(word);
				this.setState(() => ({ definition: { id: data.id, ...data.results[0].lexicalEntries[0].entries[0] } }));
			}
		} catch (e) {
			this.setState(() => ({ definition: e }))
		}
	}

	render() {
		const { anagrams, anagramQuery, definition } = this.state;
		return (
			<Container maxWidth="sm">
				<Typography variant="h4" component="h4" gutterBottom>
					Find Anagrams
				</Typography>
				<InputContainer>
					<TextField
						label="Characters"
						onChange={this.findAnagrams}
						value={anagramQuery}
					/>
				</InputContainer>
				<ul>
					{anagrams.length > 0 ?
						anagrams.map(word => (
							<li
								key={word}
								onMouseOver={() => this.showDefinition(word)}
							>
								{word}
								{definition && definition.error ? <p>{"No definition found"}</p> :
									<>
										{definition && definition.id === word &&
											<Container>
												<Paper>
													<Container>
														{definition.etymologies && <>
															<Container>
																<Typography variant="h4" component="h4" gutterBottom>
																	Etymology:
																</Typography>
																<Typography variant="body1" component="p" gutterBottom>
																	{definition.etymologies[0]}
																</Typography>
															</Container>
															<Divider />
														</>}
														<Container>
															<Typography variant="h4" component="h4" gutterBottom>
																Definitions:
															</Typography>
															<ul>
																{definition.senses.map(({ definitions = [] }) => definitions.map((item, index) => <li key={index + item.length}>{item}</li>))}
															</ul>
														</Container>
													</Container>
												</Paper>
											</Container>
										}
									</>
								}
							</li>)) :
						(anagramQuery.length > 0 && <p>{`No anagrams of "${anagramQuery}" found`}</p>)
					}
				</ul>

			</Container>
		);
	}
}

export default AnagramFinder;
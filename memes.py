class BaseMeme:
    def generate_prompt(self, input):
        raise Exception("This must be implemented")

class IqBellCurveMeme:
    def generate_prompt(self, input):
        prompt = (""""
        There is a common meme template called IQ bell curve generator. I want to generate a meme for this.
        
        In this the far left and the far right have the same opinion.
        
        A complete version involves each character — the stupid one, the middle one (the “midwit”) and the smart one — speaking a line of dialogue. The joke comes from the stupid person and the smart person saying exactly the same thing.
        
        Examples, 
        on productivity: 
        iq_extreme: just do what you want
        iq_mid: noo, you need to track your goals. set SMART goals and follow up.
        
        On Databases
        iq_extreme: just use postgres for everything
        iq_mid: noo, you need to use the right tools for the right job. We need Postgres, a graph db, a no sql and redis.
        """ + f"I want the IQ bell curve for {input}" + """
        Give me a JSON with these fields. Give me only the JSON with no additional commentary.
        
        iq_extreme
        iq_mid
        
        The json should be like this
        
        {
            "iq_extreme": "...",
            "iq_mid": ""
        }
        
        The iq_extreme has the opinion of the dumb and the smart guy
        The iq_mid has the opinion of the midwit guy
        
        Keep each text smaller than 30 words.
        """)

        return prompt

class ChangeMyMindMeme(BaseMeme):
    def generate_prompt(self, input):
        prompt = (f"""
        Generate a provocative statement for the "Change My Mind" meme template based on the following topic: {input}

        The statement should be concise, somewhat controversial, and invite debate. It should be no longer than 18 words.
        Do not include "Change my Mind" text.

        Give me a JSON with this field. Give me only the JSON with no additional commentary.

        The JSON should be like this:""" +
        """
        {
            "statement": "..."
        }
        """)
        return prompt


class DistractedBoyfriendMeme(BaseMeme):
    def generate_prompt(self, input):
        prompt = f"""
        Generate text for a 'distracted boyfriend' meme based on: {input}

        Provide JSON with these fields:
        boyfriend, distraction, girlfriend. 
        Return only JSON with no additional commentary.

        Each field should be a short phrase (5 words or less).
        """
        return prompt


class AreYaWinningSonMeme(BaseMeme):
    def generate_prompt(self, input):
        prompt = f"""
        Generate text for an 'Are Ya Winning Son?' meme based on: {input}

        Provide JSON with these fields:
        father: What the father says (usually starts with "Are ya winning son?")
        son: What the son is doing or saying
        
        Return only JSON with no additional commentary.

        Each field should be a short phrase or sentence (15 words or less).
        The humor often comes from the contrast between the father's expectation and the son's actual activity.
        """
        return prompt


class RollSafeMeme(BaseMeme):
    def generate_prompt(self, input):
        prompt = f"""
        Generate text for a 'Roll Safe' (Guy Tapping Head) meme based on: {input}

        Provide JSON with these fields:
        topText: The setup or problem statement
        bottomText: The clever (but flawed) solution or punchline

        Each field should be a short phrase (10 words or less).
        The humor comes from the seemingly clever but actually absurd or counterproductive solution.

        Example:
        {{
            "topText": "Can't get fired",
            "bottomText": "If you don't have a job"
        }}
        """
        return prompt


class WomanYellingAtCatMeme(BaseMeme):
    def generate_prompt(self, input):
        prompt = f"""
        Generate text for a 'Woman Yelling at Cat' meme based on: {input}

        Provide JSON with these fields:
        womanText: What the woman is yelling (usually accusatory or upset)
        catText: The cat's response (usually calm, confused, or sassy)

        Each field should be a short phrase or sentence (15 words or less).
        The humor often comes from the contrast between the woman's emotional state and the cat's nonchalant response.

        Example:
        {{
            "womanText": "You said you'd be home by 9!",
            "catText": "I don't even own a watch."
        }}
        """
        return prompt


class TwoButtonsMeme(BaseMeme):
    def generate_prompt(self, input):
        prompt = f"""
        Generate text for a 'Two Buttons' meme based on: {input}

        Provide JSON with these fields:
        buttonLeft: Text for the left button (usually one option or desire)
        buttonRight: Text for the right button (usually a conflicting option or desire)
        person: Description of the person or situation (optional, can be blank)

        Each button field should be a short phrase (5 words or less).
        The person field, if used, should be a short description (10 words or less).

        Example:
        {{
            "buttonLeft": "Sleep early",
            "buttonRight": "Watch another episode",
            "person": "Me at 2 AM"
        }}

        Send only valid JSON as your response, with no additional text or explanation.
        """
        return prompt


MEME_TYPES = {
    "iqBellCurve": IqBellCurveMeme(),
    "changeMyMind": ChangeMyMindMeme(),
    "distractedBoyfriend": DistractedBoyfriendMeme(),
    "areYaWinningSon": AreYaWinningSonMeme(),
    "rollSafe": RollSafeMeme(),
    "womanYellingAtCat": WomanYellingAtCatMeme(),
    "twoButtons": TwoButtonsMeme()
}
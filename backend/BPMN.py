import re
import lxml.etree as etree


with open("gpt_response2.txt", "r+") as file:
    xml_string = file.read()

# Assuming your string is called `xml_string`
cleaned_xml = re.sub(r"[\r\n]+", "", xml_string)
cleaned_xml = "".join(re.findall(r'<.*?>', cleaned_xml))

#
try:
    x = etree.fromstring(cleaned_xml)
    cleaned_pretty_cml = etree.tostring(x, pretty_print=True)
    with open("cleaned_xml.xml", "wb") as file:
        file.write(cleaned_pretty_cml)
except:
    print("XML not well formed")


#

